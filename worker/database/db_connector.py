import psycopg2
import pandas as pd

TABLE_NAME = "analysis_results"

class DBConnector:

    def __init__(self, db_name, db_host, db_port, db_user, db_password, db_ssl_cert, db_ssl_key):
        """
        Class for connecting to the dunkelziffer_radar database for backend purposes.

        :param db_name: string: name of the database
        :param db_host: string: database host
        :param db_port: string: database port
        :param db_user: string: username in the database
        :param db_password: string: password corresponding to the username
        :param db_ssl_cert: string: path to SSL certificate
        :param db_ssl_key: string: path to SSL key
        """
        self.conn = psycopg2.connect(dbname=db_name, user=db_user, password=db_password,
                                     host=db_host, port=db_port, sslcert=db_ssl_cert,
                                     sslkey=db_ssl_key)
        self.cursor = self.conn.cursor()

        # check if table exists. If it does not exist, a new table is created
        self.cursor.execute("SELECT EXISTS(SELECT * FROM information_schema.tables "
                            f"WHERE table_name='{TABLE_NAME}')")
        if not self.cursor.fetchone()[0]:
            self._setup_table()

    def _setup_table(self):
        """
        Create a new dunkelziffer_radar table.

        :return: None
        """
        # TODO: Missing ID?
        self.cursor.execute(f"CREATE TABLE {TABLE_NAME} ("
                            # here goes your schema
                            ");")
        self.conn.commit()

    def close_connection(self):
        """
        Close the connection to the database.

        :return: None
        """
        self.cursor.close()
        self.conn.close()

    def insert_row(self, data):
        """
        Insert a new row in the table. Data has to be a dict in which the keys match the columns
        in the table.

        :param data: dict: column name as key, value of the row in that column as value
        :return: None
        """
        fields, values = zip(*data.items())
        n = len(values)
        query = f"INSERT INTO {TABLE_NAME} ({', '.join(fields)}) VALUES ({', '.join(['%s'] * n)})"
        self.cursor.execute(query, values)
        self.conn.commit()

    def get_data(self):
        """
        Returns the full table from the database and converts it to a data frame.

        :return: pandas.DataFrame: complete data of the dunkelziffer_radar table.
        """
        self.cursor.execute(f"SELECT * FROM {TABLE_NAME}")
        data = self.cursor.fetchall()
        columns = [desc[0] for desc in self.cursor.description]
        return pd.DataFrame(data, columns=columns)
