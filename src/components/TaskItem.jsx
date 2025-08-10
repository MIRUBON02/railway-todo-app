import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { PencilIcon } from '~/icons/PencilIcon';
import { updateTask } from '~/store/task';
import './TaskItem.css';
import { ToggleDoneButton } from './common/ToggleDoneButton';
import { calcRemaining, formatLimit } from '~/utils/FormatDate';
import { Modal } from './Modal/Modal';
import EditTask from '~/pages/lists/[listId]/tasks/[taskId]/index.page';

export const TaskItem = ({ task, listId }) => {
  const dispatch = useDispatch();
  const { id, title, detail, done, limit } = task;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsSubmitting(true);
    void dispatch(updateTask({ id, done: !done })).finally(() => {
      setIsSubmitting(false);
    });
  }, [id, done, dispatch]);

  return (
    <div className="task_item">
      <div className="task_item__title_container">
        <ToggleDoneButton
          done={done}
          onClick={handleToggle}
          disabled={isSubmitting}
          wrapperClass="task__item__mark_button"
          completeClass="task_item__mark____complete"
          checkClass="task_item__mark____complete_check"
          incompleteClass="task_item__mark____incomplete"
        />
        <div className="task_item__title" data-done={done}>
          {title}
        </div>
        <div aria-hidden className="task_item__title_spacer"></div>
        <button
          type="button"
          className="task_item__title__action"
          onClick={() => setIsModalOpen(true)}
        >
          <PencilIcon aria-label="Edit" />
        </button>
      </div>
      <div className="task_item__detail">{detail}</div>
      {limit && (
        <div
          className={`task_item__limit ${
            calcRemaining(limit) === '期限切れ' ? 'expired' : ''
          }`}
        >
          期限: {formatLimit(limit)} （{calcRemaining(limit)}）
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EditTask
          taskId={id}
          listId={listId ?? task.listId}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
