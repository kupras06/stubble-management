from app import main
import uvicorn

def main():
    uvicorn.run(app='app.main:app',host='127.0.0.1') 
if __name__ == '__main__':
    main()
