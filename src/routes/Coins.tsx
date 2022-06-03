import styled from "styled-components";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";
import { fetchCoins } from "./Api";
import { Helmet } from "react-helmet";

const Container = styled.div`
    padding: 0px 20px;
    max-width:480px;
    margin: 0 auto;
`

const Header = styled.header`
height:15vh;
display:flex;
justify-content:center;
align-items:center;
`;

const CoinsList = styled.ul``

const Coin = styled.li`
    background-color: ${props=>props.theme.boxColor};
    color:${props=>props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a{
        display:flex;
        align-items: center;
        transition:color 0.2s ease-in-out;
        padding:20px;
        color:${(props)=>props.theme.textColor}
    }
    &:hover{
        a{
            color:${(props)=>props.theme.accentColor}
        }
    }
`

const Title = styled.h1`
    font-size: 48px;
    color:${props=>props.theme.accentColor};
    background-color: ${props=>props.theme.boxColor};
    padding: 10px;
    margin: 10px;
    border-radius: 15px;
`

const Loader=styled.span`
    text-align:center;
    display:block;
`

const Img = styled.img`
    width:35px;
    height:35px;
    margin-right: 10px;
`


interface CoinInterface{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type:string,
}
function Coins(){
    const { isLoading, data }=useQuery<CoinInterface[]>("allCoins", fetchCoins)

    return(
    <Container>
            <Helmet>
            <title>
            Coin Tracker
            </title>
        </Helmet>
        <Header>
            <Title>COIN TRACKER</Title>

        </Header>
        
        {isLoading ? (<Loader>Loading...</Loader>):(<CoinsList>
            {data?.slice(0,100).map(coin => <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={coin}>
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                    {coin.name}</Link>
                </Coin>)!}
        </CoinsList>)}
    </Container>)
}

export default Coins;