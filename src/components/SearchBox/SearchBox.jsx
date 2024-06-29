/** @format */

import {useDispatch, useSelector} from "react-redux";
import {changeFilter, selectNameFilter} from "../../redux/filtersSlice";
import style from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = (event) => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div className={style.container}>
      <label htmlFor="search">Find contacts by name</label>
      <input
        id="search"
        className={style.input}
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
