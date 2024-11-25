import React from "react";
import { Person } from "../types/Person";

type Props = {
  filteredPeople: Person[],
  onSelected: (person: Person) => React.MouseEventHandler<HTMLDivElement>
}

export const DropdownMenu: React.FC<Props> = React.memo(({ filteredPeople, onSelected }) => {
  return (
    <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
      <div className="dropdown-content">
        {filteredPeople.map((person: Person) =>
          <div className="dropdown-item" data-cy="suggestion-item" key={person.slug} onMouseDown={onSelected(person)}>
            <p className="has-text-link">{person.name}</p>
          </div>
        )}
      </div>
    </div>
  )
});
