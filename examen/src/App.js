import React, { useEffect, useState } from 'react';
import './App.css';
import { Select } from 'antd';
import { Button } from 'antd';
import { Row, Col } from 'antd';

function App() {

    const [ query, setQuery ] = useState( 'apple' );
    const [ type, setType ] = useState([] );
    const [ category, setCategory ] = useState( '' );
    const [ jokes, setJokes ] = useState( []);
    const [ next, setNext ] = useState( 0 );
    const [ search, setSearch ] = useState( 0 );
    const [datos1, setDatos1] = useState([]);

    useEffect(() => {
        const getType = async () => {
            const datos = await fetch(`https://api.chucknorris.io/jokes/categories`);
            const jsonJokeCategory = await datos.json();
            console.log('category', jsonJokeCategory);
            setType(jsonJokeCategory);
        };
        getType();

    },0)

    useEffect(() => {
        if(category == ''){
            const getJoke = async () => {
                const datos = await fetch(`https://api.chucknorris.io/jokes/random`);
                const jsonJoke = await datos.json();
                console.log('jokes', jsonJoke);
                setJokes(jsonJoke);
            };
            getJoke();
        }
        else{
            const getJoke = async () => {
                const datos = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
                const jsonJoke = await datos.json();
                console.log('jokes', jsonJoke);
                setJokes(jsonJoke);
            };
            getJoke();
        }
    }, [next])

    useEffect(() => {

        const getQuery = async () => {
            const datos = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`);
            const jsonJokeCategory = await datos.json();
            console.log('datos', jsonJokeCategory);
            setDatos1(jsonJokeCategory);
        };
        getQuery();

    }, [search])

    const { Option } = Select;

    const handleChange=(value)=> {
        console.log(`selected ${value}`);
        setCategory(value);
    }
    const handleNextJoke = () => {
        setNext(next+1);
    }

    const handleNextQuery =()=>{
        const usuQuery = (document.querySelector('#input').value).toLowerCase();
        console.log(`palabra ${usuQuery}`)
        setQuery(usuQuery);
        setSearch(search+1);
    }



  return (
    <div className="App">
        <h1> Chuck Norris Jokes</h1>
        <div className="selec">
            <label>Categorias: </label>
            <Select defaultValue="Seleccione la categoria" style={{ width: 200 }} onChange={handleChange}>
                {
                    type.map((categor, index)=>{
                        return(
                            <Option value={categor} id={`category-${index}`}>{categor}</Option>
                        )
                    })
                }

            </Select>
            <br/>
            <br/>
        </div>
        <div>
            <Button type="primary" onClick={handleNextJoke}>Otra broma</Button>
            <br/>
            <br/>
        </div>
        <div>
            {
                <div id='joke'>
                    {jokes.value}
                </div>
            }
        </div>
        <br/>
        <br/>
        <div>
            <label>Palabra Clave:  </label>
            <input type='text' id='input'/>
            <br/>
            <br/>
            <Button type="primary" onClick={handleNextQuery}>Buscar</Button>
            <Row>
                <Col span={12}>Texto</Col>
                <Col span={12}>Categoria</Col>
            </Row>


        </div>
    </div>
  );
}
export default App;


