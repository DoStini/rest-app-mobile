import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchCategories = async () => {
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjBZbmtWanRTcDJFR3UxXzNlaDlxRyJ9.eyJodHRwczovL2Rvc3RpbmkuZ2l0aHViLmlvL3Jlc3R5L2F1dGgvZW1haWwiOiJqYW5uZS5sYWhkZW50YXVzdGEyNUBnbWFpbC5jb20iLCJodHRwczovL2Rvc3RpbmkuZ2l0aHViLmlvL3Jlc3R5L2F1dGgvbmFtZSI6Imphbm5lLmxhaGRlbnRhdXN0YTI1QGdtYWlsLmNvbSIsImlzcyI6Imh0dHBzOi8vYW5kcmVtb3JlaXJhOS5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjU2NWJkNTNkYjBkZmVhYWE4NGU4ODA1IiwiYXVkIjoiaHR0cHM6Ly9kb3N0aW5pLmdpdGh1Yi5pby9yZXN0eS9hdXRoIiwiaWF0IjoxNzAxODgxMTYzLCJleHAiOjE3MDE5Njc1NjMsImF6cCI6IkVnRFBZR01YcndjNExMUllnQXdCczdpQ3hxc3JYWEtCIiwic2NvcGUiOiJyZWFkOnByb2ZpbGUgcmVhZDplbWFpbCIsImd0eSI6InBhc3N3b3JkIn0.mC75qU5IUJKogIkFg7u6HBL42AAzf-lpCGjcIPEVko3sZqxlPKPFrs3CmeaU53IvStnqTHrLdARqA2YlGVlCJQlzelnhyFcQ7eTYTnhAmibtlSiTvH26SP-DK3K-vITNUfel7KTHyLCL4odJ0yBaJ9Wqj3xPCDEuAMWCHcbcraZypIw2BxULD0uhgdw0Ry_z6t-5yt5XvQZzqrHclowHlkkJ9KXwCg2GEZ3CJ8SdwlKYMqnl7VdVGagyljFPiipKa31Khex4pr2LjqTX-gvDpVkIYl303WlHB_yP7aroUQ_roBGwqaKtxUZrT1HcyYj5gHlw3WdORk3k5CTOt5gavQ`,
    },
  };

  const response = await axios.get(`${API_URL}/orders/1/categories`, config);
  return response.data.categories;
};
