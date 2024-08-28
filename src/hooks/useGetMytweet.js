import { useEffect } from "react";
import { TWEET_API_END_POINT } from "../utlis/constant";
import { useDispatch, useSelector } from "react-redux";
import { getAlltweet } from "../redux/tweetSlice";
import { getFollowingTweets } from "../redux/tweetSlice";
import axios from "axios";

const useGetMytweet = (id) => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.tweet);
  const { follow, following } = useSelector((store) => store.tweet);
  const fetchMytweet = async () => {
    try {
      // const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
      //   withCredentials: true,
      // });
      const res = await fetch(`${TWEET_API_END_POINT}/alltweets/${id}`,{
        credentials: 'include',
      })
      console.log(`usegetmytweet res form my tweet:- ${res}`)
      const response = await res.json();
      dispatch(getAlltweet(response));
      console.log(`all tweet ${response}`);
    } catch (error) {
      console.log(`network error ${error}`);
    }
  };

  const fetchFolloingtweet = async () => {
    try {
      axios.defaults.withCredentials = true;
      // const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`);
      const res = await fetch(`${TWEET_API_END_POINT}/followingtweets/${id}`,{
        credentials: 'include',
      })
      console.log(`usegetmytweet se folloing tweet res ${res}`);
      const response = await res.json();
      dispatch(getFollowingTweets(response));
      console.log(`following tweets:- ${response}`);
    } catch (error) {
      console.log(`Network error ${error}`);
    }
  };
  useEffect(() => {
    if (follow) {
      fetchMytweet();
    } else {
      fetchFolloingtweet();
    }
  }, [refresh]);
};
export default useGetMytweet;
