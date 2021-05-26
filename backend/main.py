from app import main
import uvicorn


def main():
    uvicorn.run(app='app.main:app', host='127.0.0.1', reload=True)


if __name__ == '__main__':
    main()
