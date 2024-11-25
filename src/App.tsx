import React, { useState, useMemo } from 'react';
import './App.scss';
import cn from 'classnames';
import { peopleFromServer } from './data/people';
import { Person } from './types/Person';
import { DropdownMenu } from './components/DropdownMenu';


function debounce(callback: Function, delay: number = 300) {
  let timerId: number = 0;
  
  return (...args: any) => {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      callback(...args)
    }, delay)
  };
}


export const App: React.FC = () => {
  const [name, setName] = useState('');
  const [appliedPerson, setAppliedPerson] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const applyPerson = debounce(setAppliedPerson, 1000);

  const filteredPeople = useMemo(() => {
    return peopleFromServer.filter(person =>
      person.name.toLowerCase().includes(appliedPerson.toLowerCase()),
    );
  }, [appliedPerson]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    applyPerson(e.target.value);
    setSelectedPerson(null);
  };

  const onSelected = (person: Person) => () => {
    setName(person.name);
    setAppliedPerson('');
    setSelectedPerson(person);
  };

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        <h1 className="title" data-cy="title">
          {selectedPerson ?
            `${selectedPerson.name} (${selectedPerson.born} - ${selectedPerson.died})` : 'No selected person'
          }
        </h1>

        <div className={cn('dropdown', {
          'is-active': isDropdownActive
        }
        )}
        >
          <div className="dropdown-trigger">
            <input
              type="text"
              placeholder="Enter a part of the name"
              className="input"
              data-cy="search-input"
              value={name}
              onChange={onSearch}
              onFocus={() => setIsDropdownActive(true)}
              onBlur={() => setIsDropdownActive(false)}
            />
          </div>

          <DropdownMenu filteredPeople={filteredPeople} onSelected={onSelected} />
        </div>

        {!filteredPeople.length &&
          <div
            className="
          notification
          is-danger
          is-light
          mt-3
          is-align-self-flex-start
        "
            role="alert"
            data-cy="no-suggestions-message"
          >
            <p className="has-text-danger">No matching suggestions</p>
          </div>}
      </main>
    </div>
  );
};
