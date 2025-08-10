import { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import './TaskCreateForm.css';
import { CheckIcon } from '~/icons/CheckIcon';
import { createTask } from '~/store/task';
import { CommonButton } from './common/CommonButton';
import { ToggleDoneButton } from './common/ToggleDoneButton';
import { toUTCString } from '~/utils/FormatDate';
import { LimitInput } from './common/LimitInput';

export const TaskCreateForm = () => {
  const dispatch = useDispatch();

  const refForm = useRef(null);
  const [elemTextarea, setElemTextarea] = useState(null);

  const [formState, setFormState] = useState('initial');

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [done, setDone] = useState(false);
  const [limit, setLimit] = useState('');

  const handleToggle = useCallback(() => {
    setDone((prev) => !prev);
  }, []);

  const handleFocus = useCallback(() => {
    setFormState('focused');
  }, []);

  const handleBlur = useCallback(() => {
    if (title || detail) {
      return;
    }

    setTimeout(() => {
      // フォーム内の要素がフォーカスされている場合は何もしない
      const formElement = refForm.current;
      if (formElement && formElement.contains(document.activeElement)) {
        return;
      }

      setFormState('initial');
      setDone(false);
    }, 100);
  }, [title, detail]);

  const handleDiscard = useCallback(() => {
    setTitle('');
    setDetail('');
    setLimit('');
    setFormState('initial');
    setDone(false);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setFormState('submitting');

      const limitUTC = toUTCString(limit);

      void dispatch(createTask({ title, detail, done }))
        .unwrap()
        .then(() => {
          handleDiscard();
        })
        .catch((err) => {
          alert(err.message);
          setFormState('focused');
        });
    },
    [title, detail, done,limit]
  );

  useEffect(() => {
    if (!elemTextarea) {
      return;
    }

    const recalcHeight = () => {
      elemTextarea.style.height = 'auto';
      elemTextarea.style.height = `${elemTextarea.scrollHeight}px`;
    };

    elemTextarea.addEventListener('input', recalcHeight);
    recalcHeight();

    return () => {
      elemTextarea.removeEventListener('input', recalcHeight);
    };
  }, [elemTextarea]);

  return (
    <form
      ref={refForm}
      className="task_create_form"
      onSubmit={onSubmit}
      data-state={formState}
    >
      <div className="task_create_form__title_container">
        <ToggleDoneButton
          done={done}
          onClick={handleToggle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          wrapperClass="task_create_form__mark_button"
          completeClass="task_create_form__mark____complete"
          checkClass="task_create_form__mark____complete_check"
          incompleteClass="task_create_form__mark____incomplete"
        />
        <input
          type="text"
          className="task_create_form__title"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={formState === 'submitting'}
        />
      </div>
      {formState !== 'initial' && (
        <div>
          <textarea
            ref={setElemTextarea}
            rows={1}
            className="task_create_form__detail"
            placeholder="Add a description here..."
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            onBlur={handleBlur}
            disabled={formState === 'submitting'}
          />
          <LimitInput
            limit={limit}
            setLimit={setLimit}
            disabled={formState === 'submitting'}
            />
          <div className="task_create_form__actions">
            <CommonButton
              type="button"
              data-variant="secondary"
              onBlur={handleBlur}
              onClick={handleDiscard}
              disabled={(!title && !detail) || formState === 'submitting'}
            >
              Discard
            </CommonButton>
            <div className="task_create_form__spacer"></div>
            <CommonButton
              type="submit"
              onBlur={handleBlur}
              disabled={!title || !detail || formState === 'submitting'}
            >
              Add
            </CommonButton>
          </div>
        </div>
      )}
    </form>
  );
};
