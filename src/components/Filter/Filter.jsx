import React from "react";
import classes from "./filter.module.css";

const Filter = () => {
  return (
    <div className={classes.filter}>
      <div className={classes.filter__container}>
        <div className={classes.filter__inner}>
          <div className={classes.filter_content}>
            <div>테스트</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
