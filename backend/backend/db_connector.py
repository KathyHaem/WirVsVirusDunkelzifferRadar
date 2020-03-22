import psycopg2
import pandas as pd


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
                            "WHERE table_name='dunkelziffer_radar')")
        if not self.cursor.fetchone()[0]:
            self._setup_table()

    def _setup_table(self):
        """
        Create a new dunkelziffer_radar table.

        :return: None
        """
        # TODO: Missing ID?
        self.cursor.execute("CREATE TABLE dunkelziffer_radar ("
                            "uuid UUID, "
                            "entry_date DATE, "
                            "first_time BOOLEAN, "
                            "gender VARCHAR, "
                            "age INTEGER, "
                            "zip_code INTEGER, "
                            "cough BOOLEAN, "
                            "cough_dry BOOLEAN, "
                            "cough_productive BOOLEAN, "
                            "cough_painful BOOLEAN, "
                            "fever BOOLEAN, "
                            "fever_suspected BOOLEAN, "
                            "fever_confirmed BOOLEAN, "
                            "nose_affected BOOLEAN, "
                            "pain BOOLEAN, "
                            "pain_head BOOLEAN, "
                            "pain_limbs BOOLEAN, "
                            "diarrhea BOOLEAN, "
                            "throat BOOLEAN, "
                            "dyspnea BOOLEAN, "
                            "fatigue BOOLEAN, "
                            "corona_test BOOLEAN, "
                            "corona_positive BOOLEAN, "
                            "corona_date DATE, "
                            "pre_illness VARCHAR, "
                            "asthma BOOLEAN, "
                            "allergy BOOLEAN, "
                            "blood_pressure BOOLEAN, "
                            "diabetes BOOLEAN, "
                            "other_illness BOOLEAN);")
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
        query = "INSERT INTO dunkelziffer_radar ({0}) VALUES ({1})".format(", ".join(fields),
                                                                           ", ".join(["%s"] * n))
        self.cursor.execute(query, values)
        self.conn.commit()

    def get_data(self, region, date_start, date_end):
        """
        Returns the full table from the database and converts it to a data frame.

        :return: pandas.DataFrame: complete data of the dunkelziffer_radar table.
        """
        self.cursor.execute(f"SELECT * FROM dunkelziffer_radar WHERE {date_start} <= entry_date AND {date_end} >= entry_date")
        data = self.cursor.fetchall()
        columns = [desc[0] for desc in self.cursor.description]
        return pd.DataFrame(data, columns=columns)
