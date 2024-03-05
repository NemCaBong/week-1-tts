const url = `https://jsonplaceholder.typicode.com`;

const getData = async (link) => {
  const res = await fetch(`${url}/${link}`);
  const data = await res.json();
  return data;
};

const bai3 = async () => {
  const users = await getData("users");
  const posts = await getData("posts");
  const comments = await getData("comments");
  users.map((user) => {
    let postsUser = posts.filter((post) => post.userId === user.id);

    const postsId = postsUser.map((post) => post.id);
    let commentsByPostId = comments.filter((comment) =>
      postsId.includes(comment.postId)
    );

    user.posts = postsUser;
    user.comments = commentsByPostId;
  });
  // console.log(users[0]);
  return users;
};

const bai4 = async () => {
  const users = await bai3();
  // console.log(users.filter((user) => user.comments.length > 3));
  return users.filter((user) => user.comments.length > 3);
};

const bai5 = async () => {
  let users = await bai3();
  users.map((user) => {
    user.comments = user.comments.length;
    user.posts = user.posts.length;
  });
  // console.log(users);
  return users;
};

const bai6 = async () => {
  let users = await bai5();
  let maxComments = Math.max(...users.map((user) => user.comments));
  let userMaxComments = users.find((user) => user.comments === maxComments);
  // console.log(userMaxComments);
  return userMaxComments;
};

const bai7 = async () => {
  let users = await bai5();
  // compare func, b > a thì [b, a]
  users.sort((userA, userB) => userB.posts - userA.posts);
  // console.log(users);
  return users;
};

const bai8 = async () => {
  const postId1 = await getData("posts/1");
  const commentsForPost1 = await getData("comments?postId=1");

  postId1.comments = commentsForPost1;
  console.log(postId1);
};

bai3();
bai4();
bai5();
bai6();
bai7();
bai8();
