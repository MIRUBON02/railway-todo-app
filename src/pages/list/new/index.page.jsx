import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BackButton } from '~/components/BackButton';
import './index.css';
import { createList, setCurrentList } from '~/store/list/index';
import { useId } from '~/hooks/useId';
import { CommonButton } from '~/components/common/CommonButton';
import { FormField } from '~/components/common/FormField';
import { Link } from 'react-router-dom';

const NewList = () => {
  const id = useId();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setIsSubmitting(true);

      void dispatch(createList({ title }))
        .unwrap()
        .then((listId) => {
          dispatch(setCurrentList(listId));
          navigate(`/`);
        })
        .catch((err) => {
          setErrorMessage(err.message);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [title]
  );

  return (
    <main className="new_list">
      <BackButton />
      <h2 className="new_list__title">New List</h2>
      <p className="new_list__explanation">
        期限を設定するボタンはリスト名入力後に表示されます。
      </p>
      <p className="new_list__error">{errorMessage}</p>
      <form className="new_list__form" onSubmit={onSubmit}>
        <FormField
          className="new_list__form_field"
          id={`${id}-title`}
          labelClass="new_list__form_label"
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
          <Link to="/" data-variant="secondary" className="common_button">
            Cancel
          </Link>
          <div className="common__form_actions_spacer"></div>
          <CommonButton type="submit" disabled={isSubmitting}>
            Create
          </CommonButton>
        </div>
      </form>
    </main>
  );
};

export default NewList;
