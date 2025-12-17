|   Endpoint   | Method | Test case | Expected result |
|--------------|--------|-----------|-----------------|
| /orders/{id} | GET | Get order with valid ID | 200 OK |
| /orders/{id} | GET | Get order with invalid ID | 400 Bad Request |
| /orders/     | POST | Get order without auth | 401 Unauthorized |
| /orders/{id} | PUT | Update order with valid id and API | 200 OK |
| /orders/{id} | PUT | Update order without auth | 401 Unauthorized |
| /orders/{id} | DELETE | Delete order with valid ID | 200 OK |
| /orders/{id} | DELETE | Delete order without auth | 401 Unauthorized |
