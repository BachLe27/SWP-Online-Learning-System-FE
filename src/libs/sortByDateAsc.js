const sortByDateAsc = (list) => {
   let tmp = list;

   tmp.sort((a, b) => {
      return (a.created_at < b.created_at) ? 1 : ((a.created_at > b.created_at) ? -1 : 0);
   });

   return tmp;
}

export default sortByDateAsc;