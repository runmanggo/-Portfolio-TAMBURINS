import React from "react";
import { useQuery } from "react-query";
import classes from "./banner.module.css";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase.config";
import { storage } from "../../firebase.config";

const fetchBanners = async () => {
  const q = query(collection(db, "banner"), orderBy("id", "asc"));
  const querySnapshot = await getDocs(q);

  const banners = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      let imgUrl = "";
      let videoUrl = "";

      if (data.img) {
        const imgPath = data.img.replace(
          "gs://portfolio-tamburins.appspot.com/",
          ""
        );
        imgUrl = await getDownloadURL(ref(storage, imgPath));
      }
      if (data.video) {
        const videoPath = data.video.replace(
          "gs://portfolio-tamburins.appspot.com/",
          ""
        );
        videoUrl = await getDownloadURL(ref(storage, videoPath));
      }

      return {
        id: data.id,
        url: imgUrl,
        title: data.title,
        banner: data.banner,
        video: videoUrl,
      };
    })
  );

  return banners;
};

const Banner = () => {
  const { data: banners, isLoading, error } = useQuery("banners", fetchBanners);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {banners.map((item) => (
        <section className={classes.banner__container} key={item.id}>
          <div className={classes.banner__inner}>
            {item.url && <img src={item.url} alt="" />}
            {item.video && (
              <video controls loop muted>
                <source src={item.video} type="video/mp4" />
                <source src={item.video} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          <div className={classes.banner__title}>{item.title}</div>
          <div className={classes.banner_text}>{item.banner}</div>
        </section>
      ))}
    </>
  );
};

export default Banner;
