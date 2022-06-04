import styled from "styled-components";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";
import { fetchCoins } from "./Api";
import { Helmet } from "react-helmet";
import { useState } from "react";

const Container = styled.div`
    padding: 0px 20px;
    max-width:480px;
    margin: 0 auto;
    text-align: center;
`

const Header = styled.header`
height:15vh;
display:flex;
justify-content:center;
align-items:center;
`;

const CoinsList = styled.ul`
gap: 1em;
display:flex;
flex-wrap:wrap;
`

const Coin = styled.li`
    flex-grow:1;
    flex-basis:100px;

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
    font-family: 'Righteous', cursive;
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
const Input=styled.input`
    width:170px;
    margin-bottom:15px;
    border-radius:8px;
`
const SearchBtn=styled.button`
    border:none;
    background-color:${props=>props.theme.boxColor};
    width:80px;
    height:20px;
    border-radius:8px;
    cursor: pointer;
    margin-left: 5px;
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
    const [search, setSearch] = useState('')
    const searchInput = (e:any)=>{
        setSearch(e.target.value)
    }
    const searchBtn = ()=>{
        if(search===''){
            alert('검색어를 입력하세요.')
        }else{
            window.location.replace(`${process.env.PUBLIC_URL}/${search}`)
        }
    }
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
        <Input onChange={searchInput} placeholder='btc-bitcoin or eth-ethereum' type="text" />
        <SearchBtn onClick={searchBtn}>Search</SearchBtn>
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