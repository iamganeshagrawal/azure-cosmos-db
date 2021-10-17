import React from 'react'
import { Card, Button, Stack } from 'react-bootstrap';


function QuestionCard({question, answer, setAnswer, clearAnswer}) {
  const {id, question: questionStr, options} = question

  return (
    <Card>
      <Card.Header>
        <Stack direction="horizontal" gap={3}>
          <div>Question No.: {id}</div>
          <div className="ms-auto">
            <Button variant="danger" size="sm" disabled={answer==null} onClick={() => clearAnswer(id)}>Clear</Button>
          </div>
        </Stack>
      </Card.Header>
      <Card.Body className="px-3 py-3">
        <Card.Title>{questionStr}</Card.Title>
        <Stack gap={2} className="mx-auto pt-3">
        {
          Object.entries(options).map((op, idx) => {
            return (
              <Button 
                variant={answer == op[0] ? 'success' : 'outline-dark'}
                key={idx} 
                onClick={() => setAnswer(id, op[0])}
                disabled={answer == op[0]}
              >
                {op[1]}
              </Button>)
          })
        }
        </Stack>
      </Card.Body>
    </Card>
  )
}

export default QuestionCard