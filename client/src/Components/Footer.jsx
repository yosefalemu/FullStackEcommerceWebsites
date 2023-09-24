import React from "react";
import { styled } from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";

const Container = styled.div`
  display: flex;
  position: relative;
  padding: 20px;
  margin-bottom: 15px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
`;
const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
const Payment = styled.img`
  width: 50%;
`;
const GitHubContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`;
const GitHubLink = styled.a`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const GitHubText = styled.span`
  margin: 0 5px;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>JOSSY-ECOMMERCE</Logo>
        <Desc>
          We pride ourselves on offering a vast collection of high-quality
          products, ranging from the latest fashion trends to cutting-edge
          electronics and everything in between.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon color="0088cc">
            <TelegramIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>contact</Title>
        <ContactItem>
          <AddLocationAltIcon style={{ marginRight: "10px" }} />
          Bole Subcity, Addis Ababa, Ethiopia
        </ContactItem>
        <ContactItem>
          <LocalPhoneIcon style={{ marginRight: "10px" }} />
          +251 982010318
        </ContactItem>
        <ContactItem>
          <EmailIcon style={{ marginRight: "10px" }} />
          yosefalemumengstie@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
      <GitHubContainer>
        <GitHubLink href="https://github.com/yosefalemu">
          <GitHubIcon style={{ marginRight: "10px" }} />
          <GitHubText>Visit my GitHub Yosef_Alemu</GitHubText>
        </GitHubLink>
      </GitHubContainer>
    </Container>
  );
};

export default Footer;
