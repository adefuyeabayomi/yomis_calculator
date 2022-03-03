let conObj = {
    volume,length,weightAndMass,time,temprature,energy,speed,power,pressure,angle
};
conObj.volume={
    quantityList: ['Millilitres','Litres','GallonsUS','GallonsUK','PintsUS','PintsUK'],
    millilitres: ['1-Millilitres','0.001-Litres','0.000264-GallonsUS','0.00022-GallonsUK','0.002133-PintsUS','0.00176-PintsUK']
    ,liters: ['1000-Millilitres','1-Litres','0.264172-GallonsUS','0.219969-GallonUK','2.113376-PintsUS','1.7596-PintsUK']
    ,gallonsUS: ['3785.412-Millilitres','3.785412-Litres','1-GallonsUS','0.832674-GallonUK','8-PintsUS','6.661393-PintsUK']
    ,gallonsUK: ['4546.09-Millilitres','4.54609-Litres','1.20095-GallonsUS','1-GallonUK','9.607599-PintsUS','8-PintsUK']
    ,pintsUS: ['473.1765-Millilitres','0.473176-Litres','0.125-GallonsUS','0.104084-GallonUK','1-PintsUS','0.832674-PintsUK']
    ,pintsUK: ['568.2613-Millilitres','0.5682613-Litres','0.150119-GallonsUS','0.125-GallonUK','1.20095-PintsUS','1-PintsUK']
}
conObj.length={
    quantityList: ['Millimetres','Centimetres','Metres','Kilometres','Inches','Feet','Yards','Miles'],
    millimetres: ['1-Millimetres' , '0.1-Centimetres', '0.001-Metres', '0.000001-Kilometres','0.0397-Inches','0.003281-Feet','0.001094-Yards','0.00000062137119-Miles']
    ,centimetres: ['10-Millimetres' , '1-Centimetres', '0.01-Metres', '0.00001-Kilometres','0.393701-Inches','0.032808-Feet','0.010936-Yards','0.000006-Miles']
    ,metres: ['1000-Millimetres' , '10-Centimetres', '1-Metres', '0.0001-Kilometres','39.37008-Inches','3.28084-Feet','1.093693-Yards','0.000621-Miles']
    ,kilometres: ['1000000-Millimetres' , '100000-Centimetres', '1000-Metres', '1-Kilometres','39370.08-Inches','3280.84-Feet','1093.613-Yards','0.621371-Miles']
    ,inches: ['25.4-Millimetres' , '2.54-Centimetres', '0.0254-Metres', '0.00025-Kilometres','1-Inches','0.083333-Feet','0.027778-Yards','0.000016-Miles']
    ,feet: ['304.8-Millimetres' , '30.48-Centimetres', '0.3048-Metres', '0.000305-Kilometres','12-Inches','1-Feet','0.333333-Yards','0.000189-Miles']
    ,yards: ['914.4-Millimetres' , '91.44-Centimetres', '0.9144-Metres', '0.000914-Kilometres','36-Inches','3-Feet','1-Yards','0.000568-Miles']
    ,miles: ['1609344-Millimetres' , '160934.4-Centimetres', '1609.344-Metres', '1.609344-Kilometres','63360-Inches','5280-Feet','1760-Yards','1-Miles']
}
conObj.weightAndMass={
    quantityList:['Milligrams','Centigrams','Decigrams','Grams','Decagrams','Hectograms','Kilograms','Metric tonnes','Pounds'],
    milligrams: ['1-Milligrams','0.1-Centigrams','0.01-Decigrams','0.001-Grams','0.0001-Decagrams','0.00001-Hectograms','0.000001-Kilograms','0.000000001-Metric tonnes','0.000002-Pounds']
    ,centigrams: ['10-Milligrams','1-Centigrams','0.1-Decigrams','0.01-Grams','0.001-Decagrams','0.0001-Hectograms','0.00001-Kilograms','0.00000001-Metric tonnes','0.000022-Pounds']
    ,decigrams: ['100-Milligrams','10-Centigrams','1-Decigrams','0.1-Grams','0.01-Decagrams','0.001-Hectograms','0.0001-Kilograms','0.0000001-Metric tonnes','0.00022-Pounds']
    ,grams: ['1000-Milligrams','100-Centigrams','10-Decigrams','1-Grams','0.1-Decagrams','0.01-Hectograms','0.001-Kilograms','0.000001-Metric tonnes','0.002205-Pounds']
    ,decagrams: ['10000-Milligrams','1000-Centigrams','100-Decigrams','10-Grams','1-Decagrams','0.1-Hectograms','0.01-Kilograms','0.00001-Metric tonnes','-Pounds']
    ,hectograms: ['100000-Milligrams','10000-Centigrams','1000-Decigrams','100-Grams','10-Decagrams','1-Hectograms','01-Kilograms','0.0001-Metric tonnes','0.220462-Pounds']
    ,kilograms: ['1000000-Milligrams','100000-Centigrams','10000-Decigrams','-1000Grams','100-Decagrams','10-Hectograms','1-Kilograms','0.001-Metric tonnes','2.204623-Pounds']
    ,metricTon: ['1000000000-Milligrams','100000000-Centigrams','10000000-Decigrams','1000000-Grams','100000-Decagrams','10000-Hectograms','1000-Kilograms','1-Metric tonnes','2,204.623-Pounds']
    ,pound: ['453592.4-Milligrams','45359.24-Centigrams','4535.924-Decigrams','453.5924-Grams','45.35924-Decagrams','4.535924-Hectograms','0.453592-Kilograms','0.000454-Metric tonnes','1-Pounds']
}
conObj.time={
    quantityList:['Milleseconds','Seconds','Minutes','Hours','Days','Weeks','Years'],
    milliseconds: ['1-Milleseconds','0.001-Seconds','0.000017-Minutes','0.00000027777-Hours','0.00000001157407-Days','0.00000000165344-Weeks','0.00000000003169-Years']
    ,seconds: ['1000-Milleseconds','1-Seconds','0.016667-Minutes','0.000278-Hours','0.000012-Days','0.000002-Weeks','0.00000003168809-Years']
    ,minutes: ['60000-Milleseconds','60-Seconds','1-Minutes','0.16667-Hours','0.000694-Days','000099-Weeks','0.000002-Years']
    ,hours: ['3600000-Milleseconds','3600-Seconds','60-Minutes','1-Hours','0.041667-Days','0.005952-Weeks','0.000114-Years']
    ,days: ['864000000-Milleseconds','86400-Seconds','1440-Minutes','24-Hours','1-Days','0.142857-Weeks','0.002738-Years']
    ,weeks: ['604800000-Milleseconds','604800-Seconds','10080-Minutes','168-Hours','7-Days','1-Weeks','0.019165-Years']
    ,years: ['31557600000-Milleseconds','31557600-Seconds','525960-Minutes','8,766-Hours','365.25-Days','52.1785-Weeks','1-Years']
    
}
conObj.temprature={
    quantityList:['Celcius','Fahrenheit','Kelvin'],
    celcius: ['1-Celcius','33.8-Fahrenheit','274.15-Kelvin']
    ,fahrenheit: ['-17.22222-Celcius','1-Fahrenheit','255.9278-Kelvin']
    ,kelvin: ['-272-Celcius','-475.87-Fahrenheit','1-Kelvin']
}
conObj.energy={
    quantityList:['Joules','Kilojoules','calorie'],
    joules:['1-Joules','0.001-Kilojoules','0.24-calorie']
    ,kilojoules:['1000-Joules','1-Kilojoules','240-calorie']
    ,calories:['4.2-Joules','0.0042-Kilojoules','1-calorie']
}
conObj.speed={
    quantityList: ['Kilometer per hour (km/h)', 'Miles per hour (mph)'],
    'kilometer per hour (km/h)': ['1-Kilometer per hour (km/h)', '0.62147-Miles per hour (mph)']
    ,'iles per hour (mph)': ['1.6092-Kilometer per hour (km/h)', '1-Miles per hour (mph)']
}
conObj.power={
    quantityList: ['Watt', 'Kilowatts', 'Horsepower(US)'],
    watt: ['1-Watt', '0.001-Kilowatts', '0.001341-Horsepower(US)']
    ,kilowatts: ['1000-Watt', '1-Kilowatts', '1341022-Horsepower(US)']
    ,horsepower: ['745.6999-Watt', '0.7457-Kilowatts', '1-Horsepower(US)']
}
conObj.pressure={
    quantityList: ['Atmosphere (atm)', 'Pascal', 'Millimetres of Mecury (mmHg)', 'Pounds per square inch (psi)'],
    'Atmosphere (atm)' : ['1-Atmosphere (atm)', '101325-Pascal', '760-Millimetres of Mecury (mmHg)', '14.7-Pounds per square inch (psi)']
    ,'Pascal': ['0.00001-Atmosphere (atm)', '1-Pascal', '0.007502-Millimetres of Mecury (mmHg)', '0.000145-Pounds per square inch (psi)']
    ,'Millimetres of Mecury (mmHg)': ['0.001316-Atmosphere (atm)', '133.3-Pascal', '1-Millimetres of Mecury (mmHg)', '0.019334-Pounds per square inch (psi)']
    ,'Pounds per square inch (psi)': ['0.068746-Atmosphere (atm)', '6894.757-Pascal', '51.72361-Millimetres of Mecury (mmHg)', '1-Pounds per square inch (psi)']
}
conObj.angle={
    quantityList: ['Degrees','Radians','Gradian'],
    degrees: ['-Degrees','-Radians','-Gradian']
    ,radians: ['57.29578-Degrees','1-Radians','63.66198-Gradian']
    ,gradians: ['1-Degrees','0.0177453-Radians','1.111111-Gradian']
}
