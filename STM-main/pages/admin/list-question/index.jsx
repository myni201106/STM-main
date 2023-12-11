import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {
  addQuestion,
  getQuestions,
  deleteQuestion,
} from "../../../services/listQuestion";
import { getCharacters } from "../../../services/characterService";
import { notify } from "../../../components";

function ListQuestion({ color, questions, characters }) {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const {
      character,
      title,
      point,
      a_answer,
      b_answer,
      c_answer,
      d_answer,
      right_answer,
    } = e.target;
    if (!character.value) {
      alert("Vui lòng chọn nhân vật cho câu hỏi!");
    } else if (!right_answer.value) {
      alert("Vui lòng chọn đáp án đúng cho câu hỏi!");
    } else {
      const result = addQuestion(
        character.value,
        title.value,
        point.value,
        [a_answer.value, b_answer.value, c_answer.value, d_answer.value],
        right_answer.value
      );
      if (result) {
        setShowModal(false);
        notify("Thêm câu hỏi thành công", "success");
      } else {
        notify("Thêm câu hỏi thất bại", "error");
      }
    }
  };

  const handleRemoveQuestion = (id) => {
    console.log(id);
    if (confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) {
      deleteQuestion(id)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  return (
    <>
      <div
        className={`tw-relative tw-flex tw-flex-col tw-min-w-0 tw-break-words tw-w-full tw-b-6 tw-shadow-lg tw-rounded ${
          color === "light" ? "tw-bg-white" : "tw-bg-blueGray-700 tw-text-white"
        }`}
      >
        <div className="tw-rounded-t tw-mb-0 tw-px-4 tw-py-3 tw-border-0">
          <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between">
            <div className="tw-relative tw-w-full tw-px-4 tw-max-w-full tw-flex-grow tw-flex-1">
              <h3
                className={`tw-font-semibold tw-text-lg ${
                  color === "light" ? "tw-text-blueGray-700" : "tw-text-white"
                }`}
              >
                Questions
              </h3>
            </div>
            <button
              className="tw-py-1 tw-px-4 tw-bg-lightBlue-500 tw-text-white tw-rounded-lg hover:tw-text-lightBlue-500 hover:tw-bg-white tw-border tw-border-lightBlue-500"
              onClick={() => setShowModal(true)}
            >
              Add question
            </button>
          </div>
        </div>
        {showModal ? (
          <>
            <div className="tw-justify-center tw-items-center tw-flex tw-overflow-x-hidden tw-overflow-y-auto tw-fixed tw-inset-0 tw-z-50 tw-outline-none tw-focus:outline-none">
              <div className="tw-relative tw-w-auto tw-my-6 tw-mx-auto tw-max-w-3xl">
                {/*content*/}
                <form
                  className="tw-border-0 tw-rounded-lg tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-bg-white tw-outline-none tw-focus:outline-none"
                  onSubmit={handleAddQuestion}
                >
                  {/*header*/}
                  <div className="tw-flex tw-items-start tw-justify-between tw-p-5 tw-border-b tw-border-solid tw-border-blueGray-200 tw-rounded-t">
                    <h3 className="tw-text-3xl tw-font-semibold tw-text-gray-700">
                      Add question
                    </h3>
                    <button
                      className="tw-p-1 tw-ml-auto tw-bg-transparent tw-border-0 tw-text-black tw-float-right tw-text-3xl tw-leading-none tw-font-semibold tw-outline-none focus:tw-outline-none"
                      onClick={() => setShowModal(false)}
                      type="button"
                    >
                      <span className="tw-text-black tw-h-6 tw-w-6 tw-text-2xl tw-block tw-outline-none focus:tw-outline-none hover:tw-opacity-50">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="tw-relative tw-p-6 tw-flex-auto">
                    <div>
                      <label htmlFor="character" className="tw-mr-4">
                        Nhân vật
                      </label>
                      <select
                        name="character"
                        id="character"
                        className="tw-p-2 tw-ml-4"
                      >
                        <option value="">Chọn</option>
                        {characters?.map((item, index) => (
                          <option value={item.id} key={index}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="title" class="tw-block">
                        Title
                      </label>
                      <textarea
                        name="title"
                        rows="4"
                        className="tw-px-2 tw-py-1 tw-placeholder-blueGray-300 tw-text-blueGray-600 tw-relative tw-bg-white tw-rounded tw-text-sm tw-border tw-border-blueGray-300 tw-outline-none focus:tw-outline-none focus:tw-shadow-outline tw-w-full"
                        required={true}
                      />
                    </div>
                    <div>
                      <label htmlFor="point" className="tw-block">
                        Point
                      </label>
                      <input
                        type="number"
                        name="point"
                        className="tw-px-2 tw-py-1 tw-placeholder-blueGray-300 tw-text-blueGray-600 tw-relative tw-bg-white tw-rounded tw-text-sm tw-border tw-border-blueGray-300 tw-outline-none focus:tw-outline-none focus:tw-shadow-outline tw-w-full"
                        required={true}
                      />
                    </div>
                    <div>
                      <label>List answer</label>
                      <div className="tw-flex tw-mb-2 tw-items-center">
                        <span className="tw-mr-2">A</span>
                        <input
                          type="text"
                          name="a_answer"
                          className="tw-px-2 tw-py-1 tw-placeholder-blueGray-300 tw-text-blueGray-600 tw-relative tw-bg-white tw-rounded tw-text-sm tw-border tw-border-blueGray-300 tw-outline-none focus:tw-outline-none focus:tw-shadow-outline tw-flex-grow"
                          required={true}
                        />
                        <input
                          type="radio"
                          name="right_answer"
                          value="a"
                          className="tw-ml-2"
                        />
                      </div>
                      <div className="tw-flex tw-mb-2 tw-items-center">
                        <span className="tw-mr-2">B</span>
                        <input
                          type="text"
                          name="b_answer"
                          className="tw-px-2 tw-py-1 tw-placeholder-blueGray-300 tw-text-blueGray-600 tw-relative tw-bg-white tw-rounded tw-text-sm tw-border tw-border-blueGray-300 tw-outline-none focus:tw-outline-none focus:tw-shadow-outline tw-flex-grow"
                          required={true}
                        />
                        <input
                          type="radio"
                          name="right_answer"
                          value="b"
                          className="tw-ml-2"
                        />
                      </div>
                      <div className="tw-flex tw-mb-2 tw-items-center">
                        <span className="tw-mr-2">C</span>
                        <input
                          type="text"
                          name="c_answer"
                          className="tw-px-2 tw-py-1 tw-placeholder-blueGray-300 tw-text-blueGray-600 tw-relative tw-bg-white tw-rounded tw-text-sm tw-border tw-border-blueGray-300 tw-outline-none focus:tw-outline-none focus:tw-shadow-outline tw-flex-grow"
                          required={true}
                        />
                        <input
                          type="radio"
                          name="right_answer"
                          value="c"
                          className="tw-ml-2"
                        />
                      </div>
                      <div className="tw-flex tw-mb-2 tw-items-center">
                        <span className="tw-mr-2">D</span>
                        <input
                          type="text"
                          name="d_answer"
                          className="tw-px-2 tw-py-1 tw-placeholder-blueGray-300 tw-text-blueGray-600 tw-relative tw-bg-white tw-rounded tw-text-sm tw-border tw-border-blueGray-300 tw-outline-none focus:tw-outline-none focus:tw-shadow-outline tw-flex-grow"
                          required={true}
                        />
                        <input
                          type="radio"
                          name="right_answer"
                          value="d"
                          className="tw-ml-2"
                        />
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="tw-flex tw-items-center tw-justify-end tw-p-6 tw-border-t tw-border-solid tw-border-blueGray-200 tw-rounded-b">
                    <button
                      className="tw-text-red-500 tw-background-transparent tw-font-bold tw-uppercase tw-px-6 tw-py-2 tw-text-sm tw-outline-none focus:tw-outline-none tw-mr-1 tw-mb-1 tw-ease-linear tw-tw-transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="tw-bg-lightBlue-500 tw-text-white active:tw-bg-emerald-600 tw-font-bold tw-uppercase tw-text-sm tw-px-6 tw-py-2 tw-rounded tw-shadow hover:tw-shadow-lg tw-outline-none focus:tw-outline-none tw-mr-1 tw-mb-1 tw-ease-linear tw-transition-all tw-duration-150"
                      type="submit"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="tw-opacity-25 tw-fixed tw-inset-0 tw-z-40 tw-bg-black" />
          </>
        ) : null}
        <div className="tw-block tw-w-full tw-overflow-x-auto">
          {/* Projects table */}
          <table className="tw-items-center tw-w-full tw-bg-transparent tw-border-collapse">
            <thead>
              <tr>
                <th
                  className={`tw-px-6 tw-align-middle tw-border tw-border-solid tw-py-3 tw-text-xs tw-uppercase tw-border-l-0 tw-border-r-0 tw-whitespace-nowrap tw-font-semibold tw-text-left ${
                    color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500"
                  }`}
                >
                  STT
                </th>
                <th
                  className={`tw-px-6 tw-align-middle tw-border tw-border-solid tw-py-3 tw-text-xs tw-uppercase tw-border-l-0 tw-border-r-0 tw-whitespace-nowrap tw-font-semibold tw-text-left ${
                    color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500"
                  }`}
                >
                  Title
                </th>
                <th
                  className={`tw-px-6 tw-align-middle tw-border tw-border-solid tw-py-3 tw-text-xs tw-uppercase tw-border-l-0 tw-border-r-0 tw-whitespace-nowrap tw-font-semibold tw-text-left ${
                    color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500"
                  }`}
                >
                  Point
                </th>
                <th
                  className={`tw-px-6 tw-align-middle tw-border tw-border-solid tw-py-3 tw-text-xs tw-uppercase tw-border-l-0 tw-border-r-0 tw-whitespace-nowrap tw-font-semibold tw-text-left ${
                    color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500"
                  }`}
                >
                  Right Answer
                </th>

                <th
                  className={`tw-px-6 tw-align-middle tw-border tw-border-solid tw-py-3 tw-text-xs tw-uppercase tw-border-l-0 tw-border-r-0 tw-whitespace-nowrap tw-font-semibold tw-text-left ${
                    color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500"
                  }`}
                >
                  Action
                </th>
                <th
                  className={`tw-px-6 tw-align-middle tw-border tw-border-solid tw-py-3 tw-text-xs tw-uppercase tw-border-l-0 tw-border-r-0 tw-whitespace-nowrap tw-font-semibold tw-text-left ${
                    color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500"
                  }`}
                />
              </tr>
            </thead>

            <tbody>
              <>
                {questions?.map((item, index) => (
                  <tr key={item.id}>
                    <th className="tw-border-t-0 tw-px-6 tw-align-middle tw-border-l-0 tw-border-r-0 tw-text-xs whitespace-nowrap p-4 text-left flex items-center">
                      {index + 1}
                    </th>
                    <td className="tw-border-t-0 tw-px-6 tw-align-middle tw-border-l-0 tw-border-r-0 tw-text-xs tw-p-4">
                      {item.title}
                    </td>
                    <td className="tw-border-t-0 tw-px-6 tw-align-middle tw-border-l-0 tw-border-r-0 tw-text-xs tw-whitespace-nowrap tw-p-4">
                      {item.point}
                    </td>
                    <td className="tw-border-t-0 tw-px-6 tw-align-middle tw-border-l-0 tw-border-r-0 tw-text-xs tw-whitespace-nowrap tw-p-4">
                      <span className="tw-font-bold tw-text-center tw-uppercase">
                        {item.right_answer}
                      </span>
                    </td>
                    <td className="tw-border-t-0 tw-px-6 tw-align-middle tw-border-l-0 tw-border-r-0 tw-text-xs tw-whitespace-nowrap tw-p-4">
                      <div className="tw-flex tw-justify-center tw-items-center">
                        <Link href={`/admin/list-question/edit/${item.id}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="tw-w-6 tw-h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </Link>
                        <button
                          onClick={()=>handleRemoveQuestion(item.id)}
                          className="hover:tw-text-red-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="tw-w-6 tw-h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="tw-border-t-0 tw-px-6 tw-align-middle tw-border-l-0 tw-border-r-0 tw-text-xs tw-whitespace-nowrap tw-p-4 tw-text-right">
                      {/* <TableDropdown /> */}
                    </td>
                  </tr>
                ))}
              </>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

ListQuestion.layout = "admin";

ListQuestion.defaultProps = {
  color: "light",
};

ListQuestion.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export async function getStaticProps() {
  const questions = await getQuestions();
  const characters = await getCharacters();
  if (!questions) {
    return {
      notFound: true,
    };
  }
  return {
    props: { questions, characters },
  };
}

export default ListQuestion;
