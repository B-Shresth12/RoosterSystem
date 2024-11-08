import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

const SortableList = ({ children, onSort }) => {
    const [lists, setLists] = useState(items);
    console.table("COMPONENT", lists)
    console.table("COMPONENT ITEMS", items)

    // const handleSort = (newOrder) => {
    //     setLists(newOrder.map((id) => lists.find((item) => item.id === id)));
    // };
    return (
        <ReactSortable list={lists} setList={setLists}>
            {children}
        </ReactSortable>
        // <></>
    );
};

export default SortableList;
