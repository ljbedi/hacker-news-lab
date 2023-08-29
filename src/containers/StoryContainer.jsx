import React from 'react'
import {useState, useEffect} from 'react'
import styled from 'styled-components'

const StoryContainer = () => {

  const [input, setInput] = useState("")

  // const [topStories, setTopStories] = useState([])
  const [top20Stories, setTop20Stories] = useState ([])
  const filteredStories = top20Stories.filter((story) => story.title.toLowerCase().includes(input.toLowerCase()))

  const fetchStories = async () => {

    const top20Ids = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then((res) => res.json())
    .then((data) => data.slice(0,20))

    const top20Promises = top20Ids.map((storyId) => fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`).then((res) => res.json()))
    Promise.all(top20Promises).then((data) => setTop20Stories(data))
  }
  console.log(top20Stories);

  useEffect(( )=> {
    fetchStories()

  }, [])

  

  
  const Header = () => {
      
    const Title = styled.h3`
      font-weight: bold;
      
  `

    const OrderedList = styled.ol`
    background-color: #d3cc9b21;
    `

    const StoryTitle = styled.h4`
      margin: 5px;
      
    `
    const FlexComponent = styled.div`
      display:flex;
      justify-content:center;
      max-width: fit-content;
      margin: 0px;
      font-size: 11px;
      gap: 6px;
    `
    const NavBar = styled.ul`
      display: flex;
      list-style: none;
      align-items:center;
      gap:6px;


    `

    const FlexComponent1 = styled.div`
      display:flex;
      justify-content:space-between;
      align-items: center;
`

    const Header = styled.div`
      display: flex;
      background-color: #ff5500;
      align-items: center;
      `

      const FilteredStoriesList = styled.ul`
      
      `

    const NavItem = ({name}) => {


      return (
        <>
        <li>{name}  |</li>
        </>
      )
    }

    return (
      <>
        <Header>
        <FlexComponent1>
        <Title>Hacker News</Title>
        <NavBar>
          <NavItem name="new"/>
          <NavItem name="past"/>
          <NavItem name="comments"/>
          <NavItem name="ask"/>
          <NavItem name="show"/>
          <NavItem name="jobs"/>
          <NavItem name="submit"/>
        </NavBar>
        <p>login</p>
        </FlexComponent1>

        </Header>
        {/* <FilteredStoriesList>
          {input != "" ? filteredStories.map((story) => (
          <OrderedList>
          {top20Stories.map((story) =>
          <li>
          <StoryTitle>{story.title}</StoryTitle>
          <FlexComponent>
              <p>{story.score} points by {story.by}</p>
              <hr/>
              <p>hide</p>
              <hr/>
              <p>{story.descendants} comments</p>
          </FlexComponent>
          </li>
        )):null }
        </OrderedList>>
        </FilteredStoriesList> */}
        

        <OrderedList>
          {top20Stories.map((story) =>
          <li>
          <StoryTitle>{story.title}</StoryTitle>
          <FlexComponent>
              <p>{story.score} points by {story.by}</p>
              <hr/>
              <p>hide</p>
              <hr/>
              <p>{story.descendants} comments</p>
          </FlexComponent>
          </li>
          
          )}
        </OrderedList>
        <input name='userInput' type = "text" placeholder = "search for post" onChange = {(e) => setInput(e.target.value)}></input>


      </>
    )
  }
  
  

  return (
    <>
    <div></div>
    <Header/>
    </>
  )
}

export default StoryContainer