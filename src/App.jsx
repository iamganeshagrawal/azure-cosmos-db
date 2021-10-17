import React from 'react';
import data from './data.json';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import QuestionCard from './questioncard';

function App() {
  const [id, setId] = React.useState(0)
  const [ansMap, setAnsMap] = React.useState(new Map())

  const updateAnswer = (qid, value) => {
    if(ansMap.has(qid)){
      setAnsMap((prev) => new Map(prev).set(qid, value))
    }else{
      setAnsMap((prev) => new Map([...prev, [qid, value]]))
    }
  } 

  const clearAnswer = (qid) => {
    setAnsMap((prev) => {
      const newState = new Map(prev);
      newState.delete(qid);
      return newState;
    });
  } 

  const submitHandler = () => {
    let output = []
    data.forEach(q => {
      if(ansMap.has(q.id)){
        let temp = `Id: ${q.id}\nQ: ${q.question}\nA: ${q.options[ansMap.get(q.id)]}\n`
        output = [...output, temp]
      }
    })
    const outstr = output.join('\n')
    console.log(outstr)
    const blob = new Blob([outstr],
                { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${Date.now()}-cosmosdb-answers.txt`);
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <QuestionCard 
            question={data[id]} 
            answer={ansMap.has(data[id].id) ? ansMap.get(data[id].id) : null} 
            setAnswer={updateAnswer} 
            clearAnswer={clearAnswer}
          />
        </Col>
      </Row>
      <Row className="justify-content-md-center my-5">
        <Col xs={12} md={8}>
        <Stack direction="horizontal" gap={3}>
          <Button variant='primary' onClick={() => {setId(id-1)}} disabled={id==0}>Prev</Button>
          <Button variant='primary' onClick={() => {setId(id+1)}} disabled={id==data.length-1}>Next</Button>
          <Button 
            variant='outline-success' 
            onClick={submitHandler} 
            disabled={ansMap.size == 0}
          >Submit</Button>
        </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;