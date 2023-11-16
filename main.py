import pandas as pd
import random
#import xlsxwriter

pd.set_option("display.max_rows", None)
pd.set_option("display.max_columns",None)



def generate_data(num_entries):
    data = []
    for _ in range(num_entries):
        data.append({
            'ActivityLevel' : random.randint(0, 1200),
            'BreathingRate' : random.uniform(8,20),
            'HeartRate' :     random.randint(40,120)
        })
    return pd.DataFrame(data)

#Generate 200 entries of data
df = generate_data(200)


#Define thresholds
ActiveZonePreventation = 600
BreathingRatePreventation = 12
HeartRatePreventation = 60

#Process each entry
for index, row in df.iterrows():
    activity_level = row['ActivityLevel']
    breathing_rate = row['BreathingRate']
    heart_rate = row['HeartRate']

   #Logic for activity level
    if activity_level > ActiveZonePreventation:
        df.at[index, 'ActivityRisk'] = 'Your chance of getting diabetes is low'
    elif activity_level < ActiveZonePreventation:
        df.at[index, 'ActivityRisk'] = 'Your chance of getting diabetes is high'
    else:
        df.at[index, 'ActivityRisk'] = 'Your activity levels are equal to the recommended monthly levels'


       
    if activity_level > BreathingRatePreventation:
        df.at[index, 'BreathingRisk'] = 'Your chance of getting diabetes is low'
    elif activity_level < BreathingRatePreventation:
        df.at[index, 'BreathingRisk'] = 'Your chance of getting diabetes is high'
    else:
        df.at[index, 'BreathingRisk'] = 'Your breathing levels are equal to the recommended monthly levels'


        #Logic for heart rate
    if activity_level > HeartRatePreventation:
        df.at[index, 'HeartRisk'] = 'Your chance of getting diabetes is low'
    elif activity_level < HeartRatePreventation:
        df.at[index, 'HeartRisk'] = 'Your chance of getting diabetes is high'
    else:
        df.at[index, 'HeartRisk'] = 'Your heart rate levels are equal to the recommended monthly levels'




    """# Workbook() takes one, non-optional, argument
    # which is the filename that we want to create.
    workbook = xlsxwriter.Workbook('Userdata.xlsx')

    # The workbook object is then used to add new
    # worksheet via the add_worksheet() method.
    worksheet = workbook.add_worksheet()

    # Use the worksheet object to write
    # data via the write() method.
    df.to_csv('Userdata.xlsx')

    # Finally, close the Excel file
    # via the close() method.
    workbook.close()"""

print(df)

