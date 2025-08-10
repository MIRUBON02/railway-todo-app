import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { TaskItem } from '~/components/TaskItem';
import { TaskCreateForm } from '~/components/TaskCreateForm';
import { setCurrentList } from '~/store/list';
import { fetchTasks } from '~/store/task';
import './index.css';
import { CommonButton } from '~/components/common/CommonButton';
import { Modal } from '~/components/Modal/Modal';
import EditList from './edit/index.page';

const ListIndex = () => {
  const dispatch = useDispatch();
  const { listId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const isLoading = useSelector(
    (state) => state.task.isLoading || state.list.isLoading
  );

  const tasks = useSelector((state) => state.task.tasks);
  const listName = useSelector((state) => {
    const currentId = state.list.current;
    const list = state.list.lists?.find((list) => list.id === currentId);
    return list?.title;
  });
  const incompleteTasksCount = useSelector((state) => {
    return state.task.tasks?.filter((task) => !task.done).length;
  });

  useEffect(() => {
    dispatch(setCurrentList(listId));
    dispatch(fetchTasks()).unwrap();
  }, [listId]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="tasks_list">
      <div className="tasks_list__title">
        {listName}
        {incompleteTasksCount > 0 && (
          <span className="tasks_list__title__count">
            {incompleteTasksCount}
          </span>
        )}
        <div className="tasks_list__title_spacer"></div>
        <CommonButton
          className="common_button"
          onClick={() => setIsModalOpen(true)}
        >
          Edit...
        </CommonButton>
      </div>
      <div className="tasks_list__items">
        <TaskCreateForm />
        {tasks?.map((task) => {
          return <TaskItem key={task.id} task={task} listId={listId} />;
        })}
        {tasks?.length === 0 && (
          <div className="tasks_list__items__empty">No tasks yet!</div>
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <EditList listId={listId} onClose={closeModal} />
        </Modal>
      </div>
    </div>
  );
};

export default ListIndex;
