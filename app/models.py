from main import db

class Article:
    id: int = None
    title: str
    content: str
    is_public: bool
    created_at: str
    updated_at: str

    def insert(self):
        db.execute("SELECT * FROM articles;")