const sortByComment = (list) => {
   let tmp = list;

   tmp.sort((a, b) => {
      return b.comment_count - a.comment_count;
   });
   return tmp;
}

export default sortByComment;