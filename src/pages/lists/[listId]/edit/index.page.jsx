import { useCallback, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BackButton } from '~/components/BackButton';
import './index.css';
import { fetchLists, updateList, deleteList } from '~/store/list';
import { useId } from '~/hooks/useId';
import { CommonButton } from '~/components/common/CommonButton';
import { FormField } from '~/components/common/FormField';
import { toUTCString } from '~/utils/FormatDate';
import { LimitInput } from '~/components/common/LimitInput';

const EditList = ({ onClose }) => {
  const id = useId();

  const { listId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [limit, setLimit] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const list = useSelector((state) =>
    state.list.lists?.find((list) => list.id === listId)
  );

  useEffect(() => {
    if (list) {
      setTitle(list.title);
      setLimit(list.Limit || '');
    }
  }, [list]);

  useEffect(() => {
    void dispatch(fetchLists());
  }, [listId]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setIsSubmitting(true);

      const limitUTC = toUTCString(limit);

      void dispatch(updateList({ id: listId, title, limit: limitUTC }))
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
    [title, listId, limit, onClose, dispatch]
  );

  const handleDelete = useCallback(() => {
    if (!window.confirm('Are you sure you want to delete this list?')) {
      return;
    }

    setIsSubmitting(true);

    void dispatch(deleteList({ id: listId }))
      .unwrap()
      .then(() => {
        navigate(`/`);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, []);

  return (
    <main className="edit_list">
      <BackButton onClick={onClose} />
      <h1 className="edit_list__title">Edit List</h1>
      <p className="edit_list__error">{errorMessage}</p>
      <form className="edit_list__form" onSubmit={onSubmit}>
        <FormField
          className="edit_list__form_field"
          id={`${id}-title`}
          labelClass="edit_list__form_label"
          label="Name"
        >
          <input
            id={`${id}-title`}
            className="form_field_input"
            placeholder="Family"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
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
    </main>
  );
};

export default EditList;
