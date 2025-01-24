import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import './edit-post-modal.scss';
import { closeAppModal, openModal } from "../../../services/utils/app-data-modal-service";
import { sendRequest } from "../../../services/utils/request";
import { toast } from "react-toastify";

const EditPostModal = (props: any) => {

  const post = {...props.post};
  const link = props.editKey;
  const [postLoading, setPostLoading] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('Update Post');
  const [form, setForm] = useState<any>({
    topic: post.topic,
    brief: post.brief,
    body: post.body,
  });

  const updateField = (change: any, field: string, index?: number) => {
    const value = change.target.value
    const newForm = {...form}
    if (index || index === 0) {
      newForm.body[index][field] = value;
    } else {
      newForm[field] = value;
    }
    // newForm.body = newForm.body.filter((item: any, itemIndex: number) => {
    //   return itemIndex !== index;
    // });
    setForm(newForm);
  }

  const removePostSection = (index: number) => {
    const newForm = {...form}
    newForm.body = newForm.body.filter((item: any, itemIndex: number) => {
      return itemIndex !== index;
    });
    setForm(newForm);
  }

  const addPostSection = () =>  {
    const newForm = {...form}
    newForm.body.push({
      sub_topic: '',
      writeup: '',
    });
    setForm(newForm);
  }

  const editBlogPost = (e: any) => {
    e.preventDefault();
    setSubmitMsg('processing..');
    setPostLoading(true);
    sendRequest({
      url: `${link}/${post._id}`,
      method: 'PUT',
      body: form,
    }
    , (res: any) => {
      toast.success(res.message);
      setSubmitMsg('Update Post');
      setPostLoading(false);
      closeModal(true);
    }, (err: any) => {
      toast.error(err.error?.message || err.message);
      setSubmitMsg('Update Post');
      setPostLoading(false);
    });
  }

  const closeModal = (status?: boolean) => {
    closeAppModal(()=> props.closeModal(status));
  };

  useEffect(() => {
    openModal();
  }, []);

  return (
    <div className="app-data-modal edit-post-modal">
      <div className="modal-bg"></div>
      <div className="modal-container">
        <div className="modal-content p-3">
          <div className="modal-closer" onClick={() => closeModal()}>
              <i className="fas fa-times"></i>
          </div>
          <div className="space-control py-4">
            <div className="card-hover">
              <div className="db-card-body cover">
                <div className="content-holder item-card">
                    <h5 className="mb-0 text-center">Edit Post Article</h5>
              
                    <form method="POST" className="register-form" name="post_form" onSubmit={editBlogPost} id="post_form">
                        <div className="input-grp">
                            <label className="mb-0">Title</label><br/>
                            <input
                              type="text"
                              required
                              name="blog_title"
                              maxLength={80}
                              value={form.topic}
                              onChange={(e) => updateField(e, 'topic')}
                              id="blog_title"
                              placeholder="Blog Title"
                            />
                        </div>
                        <div className="input-grp pt-1">
                            <label className="mb-0 ">Brief Description</label><br/>
                            <textarea
                              required
                              rows={2}
                              name="brief"
                              value={form.brief}
                              onChange={(e) => updateField(e, 'brief')}
                              id="brief"
                              placeholder="Brief Description"
                            ></textarea>
                        </div>
                        {
                          form.body.map((section: any, index: number) => (
                            <div className="post-section" key={index}>
                              <div className="remove-section" title="Remove Section" onClick={() => removePostSection(index)}>
                                  <i className="fas fa-times"></i>
                              </div>
                              <div className="input-grp">
                                  <label className="mb-0">Section SubTopic</label><br/>
                                  <input
                                    type="text"
                                    name="sub_topic"
                                    maxLength={90} 
                                    value={section.sub_topic}
                                    id={'sub_topic' + index}
                                    onChange={(e) => updateField(e, 'sub_topic', index)}
                                    placeholder="Enter section subtopic"
                                  />
                              </div>
                              <div className="input-grp pt-1">
                                  <label className="mb-0">Section Writeup</label><br/>
                                  <textarea
                                    rows={4}
                                    required
                                    value={section.writeup}
                                    onChange={(e) => updateField(e, 'writeup', index)}
                                    name={'writeup' + index}
                                    id={'writeup' + index}
                                    placeholder="Fill in section writeup"
                                  >
                                  </textarea>
                              </div>
                            </div>
                          ))
                        }
                        <div className="add-section pb-3 pt-2">
                            <button type="button" className='hollow-button rad-5-im reduced-im shadowed' onClick={addPostSection}><i className="fas fa-plus"></i> Add post section</button>
                        </div>
                        <div className="form-group form-button w100b max500 full-button">
                            <button type="submit" className='solid-button-2c rad-10 shadowed' disabled={postLoading}>{ submitMsg }</button>
                        </div>
                    </form>

                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPostModal;
