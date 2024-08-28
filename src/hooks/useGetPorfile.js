import { useEffect } from "react";
import { USER_API_END_POINT } from "../utlis/constant";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";
import axios from "axios";

const useGetProfile = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
        //   withCredentials: true
        // });
        const res = await fetch(`${USER_API_END_POINT}/profile/${id}`,{
          credentials: 'include',
        })
        console.log(`usegetprofile ka res :- ${res}`)
        const response = await res.json();
        dispatch(getMyProfile(response))
      } catch (error) {
        console.log(`network error ${error}`);
      }
    };
    fetchProfile();
  }, [id]);
};
export default useGetProfile;
