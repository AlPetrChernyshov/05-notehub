import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { NoteTag } from '../../types/note';
import css from './NoteForm.module.css';


interface NoteFormProps {
  onSubmit: (values: NoteFormValues) => void;
  onCancel: () => void;
}


export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title is too short (min 3 chars)')
    .max(50, 'Title is too long (max 50 chars)')
    .required('Title is required'),
  content: Yup.string()
    .max(500, 'Content is too long (max 500 chars)'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
});

const NoteForm = ({ onSubmit, onCancel }: NoteFormProps) => {
  const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          {/* Поле для заголовка */}
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field 
              id="title" 
              type="text" 
              name="title" 
              className={css.input} 
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          {/* Поле для контенту (textarea) */}
          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          {/* Поле для вибору тегу (select) */}
          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          {/* Кнопки керування */}
          <div className={css.actions}>
            <button 
              type="button" 
              className={css.cancelButton} 
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;