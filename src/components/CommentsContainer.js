import React from "react";

const commentsData = [
  {
    name: "sangarajugupta",
    text: "creating a project",
    replies: [
      {
        name: "sangarajugupta sub1",
        text: "creating a project",
        replies: [],
      },
      {
        name: "sangarajugupta sub2",
        text: "creating a project",
        replies: [{
            name: "sangarajugupta sub1 subort",
            text: "creating a project",
            replies: [],
          },],
      },
    ],
  },
  {
    name: "sangarajugupta",
    text: "creating a project",
    replies: [
      {
        name: "sangarajugupta sub1",
        text: "creating a project",
        replies: [],
      },
      {
        name: "sangarajugupta sub2",
        text: "creating a project",
        replies: [],
      },
    ],
  },
  {
    name: "sangarajugupta",
    text: "creating a project",
    replies: [
      {
        name: "sangarajugupta sub1",
        text: "creating a project",
        replies: [],
      },
      {
        name: "sangarajugupta sub2",
        text: "creating a project",
        replies: [],
      },
    ],
  },
];

const Comment = ({ data }) => {
  const { name, text, replies } = data;
  return (
    <div className="flex shadow-sm bg-gray-100 p-2 rounded-md my-2">
      <img
        className="w-8 h-8"
        src="https://e7.pngegg.com/pngimages/527/663/png-clipart-logo-person-user-person-icon-rectangle-photography-thumbnail.png"
        alt="user"
      />
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

const CommentsList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div  key={index}>
    <Comment data={comment} />
    <div className="pl-5 border-l-black ml-5">
    <CommentsList comments={comment.replies} />
    </div>
    </div>
  ));
};

const CommentsContainer = () => {
  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold">Comments:</h1>
      <CommentsList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
