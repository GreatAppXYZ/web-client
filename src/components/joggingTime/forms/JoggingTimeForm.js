import React from "react";
import TextInput from "../../common/TextInput";
import NumberInput from "../../common/NumberInput";
import DateInput from "../../common/DateInput";
import moment from "moment";

const JoggingTimeForm = ({joggingTime, onSave, onDelete, onChange, onCancel, saving, deleting, showDeleteButton, errors}) => {
  let minutes = Math.floor(joggingTime.time / 60);
  let seconds = joggingTime.time - (minutes * 60);
  let actionsStyle = {
    marginRight: 20,
    marginTop: 10
  };
  let submitStyle = {
    marginTop: 10,
    marginRight: 50
  };
  return (
    <form>
      <DateInput
        name="date"
        label="Date (mm/dd/yyyy)"
        value={moment({year: joggingTime.year, month: joggingTime.month - 1, day: joggingTime.day}).format('YYYY-MM-DD')}
        onChange={onChange}
        error={errors.date}/>

      <NumberInput
        name="distance"
        label="Distance (meters)"
        placeholder="Distance"
        value={joggingTime.distance}
        onChange={onChange}
        error={errors.distance}/>

      <NumberInput
        name="minutes"
        label="Minutes"
        placeholder="Minutes"
        value={minutes}
        onChange={onChange}
        error={errors.time}/>

      <NumberInput
        name="seconds"
        label="Seconds"
        placeholder="Seconds"
        value={seconds}
        onChange={onChange}
        error={errors.time}/>

      <input
        id="save"
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}
        style={submitStyle}/>

      <input
        id="delete"
        type={showDeleteButton ? 'submit' : 'hidden'}
        disabled={deleting}
        value={deleting ? 'Deleting...' : 'Delete'}
        className="btn btn-danger"
        onClick={onDelete}
        style={actionsStyle}/>

      <input
        id="cancel"
        type="submit"
        value="Cancel"
        className="btn btn-default"
        onClick={onCancel}
        style={actionsStyle}/>
    </form>
  );
};


JoggingTimeForm.propTypes = {
  joggingTime: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  deleting: React.PropTypes.bool,
  showDeleteButton: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default JoggingTimeForm;
