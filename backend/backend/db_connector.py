import psycopg2
import pandas as pd


class DBConnector:

    def __init__(self, db_name, db_host, db_port, db_user, db_password):
        self.conn = psycopg2.connect(dbname=db_name, user=db_user, password=db_password,
                                     host=db_host, port=db_port)
        self.cursor = self.conn.cursor()

        # check if table exists
        self.cursor.execute('SELECT EXISTS(SELECT * FROM information_schema.tables '
                            'WHERE table_name=dunkelziffer_radar)')
        if not self.cursor.fetchone()[0]:
            self._setup_table()

    def _setup_table(self):
        #TODO: Missing column names, keys and data types
        self.cursor.execute('CREATE TABLE dunkelziffer_radar ('
                            ''
                            ''
                            ');')
        self.conn.commit()

    def close_connection(self):
        self.cursor.close()
        self.conn.close()

    def insert_row(self, data):
        fields, values = zip(*data.items())
        n = len(values)
        query = 'INSERT INTO dunkelziffer_radar ({0}) VALUES ({1})'.format(', '.join(fields),
                                                                           ', '.join(['%s']*n))
        self.cursor.execute(query, values)
        self.conn.commit()

    def get_data(self):
        self.cursor.execute('SELECT * FROM dunkelziffer_radar')
        data = self.cursor.fetchall()
        columns = [desc[0] for desc in self.cursor.description]
        return pd.DataFrame(data, columns=columns)