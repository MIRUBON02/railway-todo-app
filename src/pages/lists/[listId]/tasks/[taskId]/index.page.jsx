import { useCallback, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BackButton } from '~/components/BackButton';
import './index.css';
import { setCurrentList } from '~/store/list';
import { fetchTasks, updateTask, deleteTask } from '~/store/task';
import { useId } from '~/hooks/useId';
import { CommonButton } from '~/components/common/CommonButton';
import { FormField } from '~/components/common/FormField';
import { toUTCString } from '~/utils/FormatDate';
import { LimitInput } from '~/components/common/LimitInput';

const EditTask = ({ listId, taskId, onClose }) => {
  const id = useId();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [done, setDone] = useState(false);
  const [limit, setLimit] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const task = useSelector((state) =>
    state.task.tasks?.find((task) => task.id === taskId)
  );

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDetail(task.detail);
      setDone(task.done);
      setLimit(task.Limit || '');
    }
  }, [task]);

  useEffect(() => {
    void dispatch(setCurrentList(listId));
    void dispatch(fetchTasks());
  }, [listId]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsSubmitting(true);

      const limitUTC = toUTCString(limit);

      void dispatch(
        updateTask({ id: taskId, title, detail, done, limit: limitUTC })
      )
        .unwrap()
        .then(() => {
          onClose();
        })
        .catch((err) => {
          setErrorMessage(err.message);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [title, taskId, listId, detail, done, limit]
  );

  const handleDelete = useCallback(() => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setIsSubmitting(true);

    void dispatch(deleteTask({ id: taskId }))
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [taskId]);

  return (
    <div className="edit_list">
      <p className="edit_list__error">{errorMessage}</p>
      <form className="edit_list__form" onSubmit={onSubmit}>
        <FormField
          className="edit_list__form_field"
          id={`${id}-title`}
          labelClass="edit_list__form_label"
          label="Title"
        >
          <input
            id={`${id}-title`}
            className="form_field_input"
            placeholder="Buy some milk"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </FormField>
        <FormField
          className="edit_list__form_field"
          id={`${id}-detail`}
          labelClass="edit_list__form_label"
          label="Description"
        >
          <textarea
            id={`${id}-detail`}
            className="form_field_input"
            placeholder="Blah blah blah"
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
          />
        </FormField>
        <FormField
          className="edit_list__form_field"
          labelClass="edit_list__form_label"
          label="Deadline"
        >
          <LimitInput
            limit={limit}
            setLimit={setLimit}
            disabled={isSubmitting}
          />
        </FormField>

        <FormField
          className="edit_list__form_field"
          id={`${id}-done`}
          labelClass="edit_list__form_label"
          label="Is Done"
        >
          <div>
            <input
              id={`${id}-done`}
              type="checkbox"
              checked={done}
              onChange={(event) => setDone(event.target.checked)}
            />
          </div>
        </FormField>
        <div className="common__form_actions">
          <CommonButton
            type="button"
            data-variant="secondary"
            className="common_button"
            onClick={onClose}
          >
            Cancel
          </CommonButton>
          <div className="common__form_actions_spacer"></div>
          <CommonButton
            type="button"
            className=" edit_list__form_actions_delete"
            disabled={isSubmitting}
            onClick={handleDelete}
          >
            Delete
          </CommonButton>
          <CommonButton type="submit" disabled={isSubmitting}>
            Update
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
