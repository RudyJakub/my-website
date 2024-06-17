import psycopg2

conn_string = "postgresql://rudy:123@db:5432/rudy_db"
conn = psycopg2.connect(conn_string)
db = conn.cursor()
