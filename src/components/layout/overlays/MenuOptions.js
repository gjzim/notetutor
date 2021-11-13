import Option from "../../UI/Form/Option";
import Checkbox from "../../UI/Form/Checkbox";

import classes from "./MenuOptions.module.css";

function MenuOptions(props) {
  return (
    <div className="MenuOptions">
      <Option label="Total Questions" id="total_ques">
        <input
          type="range"
          min="10"
          max="99"
          value="20"
          className={classes.TotalQues}
        />
        <span id="total_ques_display" className={classes.TotalQuesDisp}>
          20
        </span>
      </Option>

      <Option label="Strings" id="strings">
        <select name="strings">
          <option value="0,1,2,3,4,5">All</option>
          <option value="0,1,2">Top Three</option>
          <option value="3,4,5">Bottom Three</option>
          <option value="custom">Custom</option>
        </select>

        <div
          className={classes.StringCheckboxesWrap}
          id="string-checkboxes-wrap"
        >
          <Checkbox
            id="string_first"
            className={classes.StringCheckbox}
            name="string"
            label="1(E)"
            value="1"
          />
          <Checkbox
            id="string_second"
            className={classes.StringCheckbox}
            name="string"
            label="2(B)"
            value="2"
          />
          <Checkbox
            id="string_third"
            className={classes.StringCheckbox}
            name="string"
            label="3(G)"
            value="3"
          />
          <Checkbox
            id="string_fourth"
            className={classes.StringCheckbox}
            name="string"
            label="4(D)"
            value="4"
          />
          <Checkbox
            id="string_fifth"
            className={classes.StringCheckbox}
            name="string"
            label="5(A)"
            value="5"
          />
          <Checkbox
            id="string_sixth"
            className={classes.StringCheckbox}
            name="string"
            label="6(e)"
            value="6"
          />
        </div>
      </Option>

      <Option label="Frets" id="frets">
        <select name="frets" id="frets-select">
          <option value="0,1,2,3,4,5,6,7,8,9,10,11,12,13">All</option>
          <option value="1,2,3,4,5">1-5</option>
          <option value="6,7,8,9,10,11,12">6-12</option>
          <option value="custom">Custom</option>
        </select>

        <div className={classes.FretCheckboxesWrap} id="fret-checkboxes-wrap">
          <Checkbox
            id="fret_zero"
            className={classes.FretCheckbox}
            name="fret"
            label="0"
            value="0"
          />
          <Checkbox
            id="fret_first"
            className={classes.FretCheckbox}
            name="fret"
            label="1"
            value="1"
          />
          <Checkbox
            id="fret_second"
            className={classes.FretCheckbox}
            name="fret"
            label="2"
            value="2"
          />
          <Checkbox
            id="fret_third"
            className={classes.FretCheckbox}
            name="fret"
            label="3"
            value="3"
          />
          <Checkbox
            id="fret_fourth"
            className={classes.FretCheckbox}
            name="fret"
            label="4"
            value="4"
          />
          <Checkbox
            id="fret_fifth"
            className={classes.FretCheckbox}
            name="fret"
            label="5"
            value="5"
          />
          <Checkbox
            id="fret_sixth"
            className={classes.FretCheckbox}
            name="fret"
            label="6"
            value="6"
          />
          <Checkbox
            id="fret_seventh"
            className={classes.FretCheckbox}
            name="fret"
            label="7"
            value="7"
          />
          <Checkbox
            id="fret_eighth"
            className={classes.FretCheckbox}
            name="fret"
            label="8"
            value="8"
          />
          <Checkbox
            id="fret_ninth"
            className={classes.FretCheckbox}
            name="fret"
            label="9"
            value="9"
          />
          <Checkbox
            id="fret_tenth"
            className={classes.FretCheckbox}
            name="fret"
            label="10"
            value="10"
          />
          <Checkbox
            id="fret_eleventh"
            className={classes.FretCheckbox}
            name="fret"
            label="11"
            value="11"
          />
          <Checkbox
            id="fret_twelfth"
            className={classes.FretCheckbox}
            name="fret"
            label="12"
            value="12"
          />
          <Checkbox
            id="fret_thirteenth"
            className={classes.FretCheckbox}
            name="fret"
            label="13"
            value="13"
          />
        </div>
      </Option>
    </div>
  );
}

export default MenuOptions;
