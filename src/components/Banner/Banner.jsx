import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase.config";

import classes from "./banner.module.css";

const fetchBanners = async (category) => {
  //banner 데이터 조회를 위한  쿼리 생성
  const q = query(collection(db, "banner"), orderBy("id", "asc"));
  const querySnapshot = await getDocs(q);

  const banners = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      // 이미지, 비디오 url 저장
      let imgUrl = "";
      let videoUrl = "";

      //이미지의 URL을 가져오려면, 스토리지 버킷 이름 없이 이미지 파일의 경로만을 필요
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
        category: data.category,
      };
    })
  );

  const filteredBanners = category
    ? banners.filter((banner) => banner.category === category)
    : banners;

  return filteredBanners;
};

const Banner = () => {
  const { category } = useParams();

  const {
    data: banners,
    isLoading,
    error,
  } = useQuery(["banners", category], () => fetchBanners(category));

  if (isLoading) return console.log("loading");
  if (error) return console.log("error.message");

  return (
    <>
      {banners.map((item) => (
        <section key={item.id} className={classes.banner__container}>
          <div className={classes.banner__inner}>
            {item.url && <img src={item.url} alt="" />}
            {item.video && (
              <video loop muted autoPlay>
                <source src={item.video} type="video/mp4" />
                <source src={item.video} type="video/webm" />
              </video>
            )}
          </div>
          <div className={classes.banenr__context}>
            <div className={classes.banner__title}>{item.title}</div>
            <div className={classes.banner_text}>{item.banner}</div>
          </div>
        </section>
      ))}
    </>
  );
};

export default Banner;
