import {
  IconNode,
  IconDocker,
  IconGraphql,
  IconLanguageJavascript,
  IconJava,
  IconHtml5,
  IconCss3,
  IconPython,
  IconGolang,
  IconLanguageC,
  IconLanguageCpp,
  IconLanguageTypescript,
  IconGit,
  IconMongodb,
  IconPostgresql,
  IconAws,
  IconElasticsearch,
  IconKubernetes,
  IconMysql,
} from "../home/background-overlay-icons/index";
import "./home.css";
import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
// import CarouselCylinder from "../home/carousel-cylinder/carousel-cylinder-container";

const IconWithPosition = ({ top, left, component }: any) => (
  <div
    style={{
      height: "5em",
      width: "5em",
      background: "transparent",
      borderRadius: "50%",
      pointerEvents: "none",
      boxShadow: "inset 0 0 5px rgba(255,255,255,0.5)",
      position: "absolute",
      top: top,
      left: left,
      paddingTop: "1em",
      animation: "zoomInAndOut 2s linear infinite",
      // animation: "leftAndRight 10s linear infinite",
    }}
  >
    {component}
  </div>
);

const generateTechBackground = () => {
  const iconComponents = [
    <IconNode height="3em" width="3em" />,
    <IconDocker height="3em" width="3em" />,
    <IconGraphql height="3em" width="3em" />,
    <IconLanguageJavascript height="3em" width="3em" />,
    <IconJava height="3em" width="3em" />,
    <IconHtml5 height="3em" width="3em" />,
    <IconCss3 height="3em" width="3em" />,
    <IconPython height="3em" width="3em" />,
    <IconGolang height="3em" width="3em" />,
    <IconLanguageC height="3em" width="3em" />,
    <IconLanguageCpp height="3em" width="3em" />,
    <IconLanguageTypescript height="3em" width="3em" />,
    <IconGit height="3em" width="3em" />,
    <IconMongodb height="3em" width="3em" />,
    <IconPostgresql height="3em" width="3em" />,
    <IconAws height="3em" width="3em" />,
    <IconElasticsearch height="3em" width="3em" />,
    <IconKubernetes height="3em" width="3em" />,
    <IconMysql height="3em" width="3em" />,
  ].sort(() => Math.random() - 0.5);

  let iconPairs: ReactElement[] | null = [];
  let coordinates: Array<[number, number]> = [];
  let totalRetries = 0;
  let eachRetriesThreshold = 10;
  let totalRetriesThreshold = eachRetriesThreshold * 100;
  let threshold = 5;
  for (
    let i = 0;
    i < iconComponents.length && totalRetries < totalRetriesThreshold;

  ) {
    let nonOverlapCoordinateFound = false;
    let retries = 0;
    while (!nonOverlapCoordinateFound && retries < eachRetriesThreshold) {
      const leftRandom = 30 + Math.floor(Math.random() * 40);
      const topRandom = (20 + Math.floor(i * (60 / iconComponents.length))) / 2;
      totalRetries++;
      if (coordinates.length === 0) {
        nonOverlapCoordinateFound = true;
      } else {
        let isOverlapping = false;
        coordinates.forEach((coordinate) => {
          if (
            Math.abs(coordinate[0] - leftRandom) < threshold &&
            Math.abs(coordinate[1] - topRandom) < threshold
          ) {
            isOverlapping = true;
          }
        });
        if (!isOverlapping) nonOverlapCoordinateFound = true;
      }
      if (nonOverlapCoordinateFound) {
        coordinates.push([leftRandom, topRandom]);
      }
      retries = retries + 1;
    }

    if (nonOverlapCoordinateFound) {
      iconPairs.push(
        <IconWithPosition
          left={`${coordinates[i][0]}%`}
          top={`${coordinates[i][1]}%`}
          component={iconComponents[i]}
        />
      );
      i = i + 1;
    }
  }

  return (
    <div style={{ zIndex: -1 }} key="techHeader">
      {iconPairs}
    </div>
  );
};

const Home = ({ resumeData }: any) => {
  const { fullName, titles, headline } = resumeData;

  const backgroundOverlayIcons = useMemo(generateTechBackground, [
    resumeData.name,
  ]);

  const [nameHeader, setNameHeader] = useState<string>(() => {
    const [firsName, lastName] = fullName.split(" ");
    return `${firsName[0]} ${lastName[0]}`;
  });

  const nameUpdater = useRef(0);
  const titleSubHeaderTextUpdater = useRef(0);
  const titleRefreshEveryinMs = 5;
  const [titleSubHeader, setTitleSubHeader] = useState<string>(titles[0]);

  const [titleSubHeaderText, setTitleSubHeaderText] = useState<string>(
    ".".repeat(titleSubHeader.length)
  );
  useEffect(() => {
    if (
      nameUpdater.current <
      Math.max(...fullName.split(" ").map((name: string) => name.length))
    ) {
      nameUpdater.current += 1;
      const [firsName, lastName] = fullName.split(" ");

      const timer = setTimeout(
        () =>
          setNameHeader(
            `${firsName.slice(0, nameUpdater.current)} ${lastName.slice(
              0,
              nameUpdater.current
            )}`
          ),
        1000
      );

      return () => clearTimeout(timer);
    }
  }, [nameHeader, fullName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const selectedTitleIndex = Math.floor(Math.random() * titles.length);
      titleSubHeaderTextUpdater.current = 0;
      setTitleSubHeader(titles[selectedTitleIndex]);
      setTitleSubHeaderText(".".repeat(titles[selectedTitleIndex].length));
    }, titleRefreshEveryinMs * 1000);

    return () => clearTimeout(timer);
  }, [titles, titleSubHeader]);

  useEffect(() => {
    if (titleSubHeaderTextUpdater.current < titleRefreshEveryinMs / 2) {
      titleSubHeaderTextUpdater.current += titleRefreshEveryinMs / 10;
      const timer = setTimeout(() => {
        setTitleSubHeaderText(
          titleSubHeader
            .split("")
            .map((_) => String.fromCharCode(65 + Math.random() * 26))
            .join("")
        );
      }, titleRefreshEveryinMs * 100);

      return () => clearTimeout(timer);
    } else {
      setTitleSubHeaderText(titleSubHeader);
    }
  }, [titleSubHeaderText, titleSubHeader]);

  return (
    <section className="home">
      {backgroundOverlayIcons}
      <div className="intro">
        <img src={"assets/my-profile-pic.png"} alt="" className="home__img" />
        <h1 className="home__name">{nameHeader}</h1>
        <div key={titleSubHeaderText}>
          {titleSubHeaderText.split("").map((titleSubLetter) => (
            <div className="home__title__letter">{titleSubLetter}</div>
          ))}
        </div>
        <div className="home__looking_for"> {headline} </div>
        <a
          href={require("../files/resume.pdf")}
          className="btn"
          target={"_blank"}
          rel="noreferrer"
        >
          Download CV
        </a>
      </div>
    </section>
  );
};

export default Home;
