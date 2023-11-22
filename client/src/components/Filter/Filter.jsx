import React from "react";
import classes from "./filter.module.css";

const Filter = (props) => {
  return (
    <div className={classes.filter}>
      <div className={classes.filter__container}>
        <div className={classes.filter__inner}>
          <div className={classes.filter_content}>
            <div>
              {props.title} <span>({props.quantity})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
