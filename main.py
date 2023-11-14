# import xlsxwriter module
import xlsxwriter

# Workbook() takes one, non-optional, argument
# which is the filename that we want to create.
workbook = xlsxwriter.Workbook('hello.xlsx')

# The workbook object is then used to add new
# worksheet via the add_worksheet() method.
worksheet = workbook.add_worksheet()

# Use the worksheet object to write
# data via the write() method.
worksheet.write('A1', 12)
worksheet.write('B1', 'Geeks')
worksheet.write('C1', 'For')
worksheet.write('D1', 'Geeks')

# Finally, close the Excel file
# via the close() method.
workbook.close()

#user data will be selected from a database
userData = input("Activity Levels")
userData_int = int(userData)
"""recommend level of activity per month"""
ActiveZonePreventation = 600
BreathingRatePreventation = 12
HeartRatePreventation = 60
#SELECT ACTIVITYLEVEL FROM USERDATA
#Monthly Activity levels
if userData_int > ActiveZonePreventation:
    print("chance of getting diabetes is low")
elif userData_int < ActiveZonePreventation:
    print("chance of getting diabetes is high")
else:
    print("your activity level is equal to the recommended monthly levels")

#Montly breathing rate levels
userData = input("Breathing Rate levels")
if userData_int > BreathingRatePreventation:
    print("chance of getting diabetes is high")
elif userData_int <= BreathingRatePreventation:
    print("chance of getting diabetes is low")
else:
    print("your breathing level is equal to the recommended monthly levels")

#Monhtly Heart Rate levels
userData = input("Heart Rate levels")
if userData_int > HeartRatePreventation:
    print("chance of getting diabetes is low")
elif userData_int <= HeartRatePreventation:
    ("chance of getting diabetes is high")
else:
    print("your heart rate level is equal to the recommended monthly levels")


    """Save information from CSV file into a dictionary.
    Then call the dictionary when you need to use a value"""