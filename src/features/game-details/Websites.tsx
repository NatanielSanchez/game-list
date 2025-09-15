import styled from "styled-components";
import type { Website, WebsiteName } from "../../services/types";
import {
  FaApple,
  FaBluesky,
  FaDiscord,
  FaFacebookF,
  FaGlobe,
  FaGooglePlay,
  FaHouse,
  FaInstagram,
  FaItchIo,
  FaMeta,
  FaPlaystation,
  FaRedditAlien,
  FaSteam,
  FaTwitch,
  FaWikipediaW,
  FaXbox,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { SiEpicgames, SiGogdotcom, SiNintendoswitch } from "react-icons/si";
import type { JSX } from "react";
import { NavLink } from "react-router-dom";

function Websites({ websites }: { websites?: Website[] }) {
  if (!websites || websites.length === 0) return null;

  return (
    <StyledWebsites>
      {websites.map((website) => (
        <WebsiteLink key={website.id} to={website.url} title={`Go to ${website.name} page`}>
          {getWebsiteIcon(website.name)}
        </WebsiteLink>
      ))}
    </StyledWebsites>
  );
}

export default Websites;

const StyledWebsites = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  row-gap: 1rem;
`;

const WebsiteLink = styled(NavLink)`
  & svg {
    color: var(--color-grey-500);
    font-size: 4rem;

    &:hover {
      color: var(--color-brand-700);
    }
  }
`;

function getWebsiteIcon(websiteName: WebsiteName): JSX.Element {
  switch (websiteName) {
    case "Community Wiki":
      return <FaGlobe />;
    case "Twitch":
      return <FaTwitch />;
    case "Twitter":
      return <FaXTwitter />;
    case "Wikipedia":
      return <FaWikipediaW />;
    case "Facebook":
      return <FaFacebookF />;
    case "Google Play":
      return <FaGooglePlay />;
    case "Instagram":
      return <FaInstagram />;
    case "Subreddit":
      return <FaRedditAlien />;
    case "Official Website":
      return <FaHouse />;
    case "YouTube":
      return <FaYoutube />;
    case "App Store (iPhone)":
    case "App Store (iPad)":
      return <FaApple />;
    case "Itch":
      return <FaItchIo />;
    case "Steam":
      return <FaSteam />;
    case "Epic":
      return <SiEpicgames />;
    case "GOG":
      return <SiGogdotcom />;
    case "Discord":
      return <FaDiscord />;
    case "Bluesky":
      return <FaBluesky />;
    case "Xbox":
      return <FaXbox />;
    case "Playstation":
      return <FaPlaystation />;
    case "Nintendo":
      return <SiNintendoswitch />;
    case "Meta":
      return <FaMeta />;
  }
}
