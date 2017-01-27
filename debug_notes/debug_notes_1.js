/*Constatation 1:
	When in negative, center chunk in buffer is not the good one
*/

renderFrame.top_left_tile[1]
>> -139

player.x
>> -2.0555890242866117

check_if_inside(chunk_buffer[0][2],-2,-135)
>> false

chunk_buffer[0][2]
>> Object {lieux: Array[1], left_x: -64, top_y: -256, chunk_name: "Sopó Madinina Wasteland", discovery_time: "2016-12-07 17:09:06"…}

check_if_inside(chunk_buffer[1][2],-2,-135)
>> false

chunk_buffer[1][2]
>> Object {lieux: Array[1], left_x: -64, top_y: -128, chunk_name: "Cerinza Amonhana Sacred Land", discovery_time: "2016-12-06 22:08:32"…}

q = testRequests.print_chunk_buffer_coords()
>> 0,0:(-192,-256)
>> 0,1:(-128,-256)
>> 0,2:(-64,-256)
>> 0,3:(0,-256)
>> 0,4:(64,-256)
>> 1,0:(-192,-192)
>> 1,1:(-128,-128)
>> 1,2:(-64,-128)
>> 1,3:(0,-128)
>> 1,4:(64,-128)
>> 2,0:(-192,-128)
>> 2,1:(-128,-64)
>> 2,2:(-64,-64)
>> 2,3:(0,-64)
>> 2,4:(64,-64)
>> 3,0:(-192,-64)
>> 3,1:(-128,0)
>> 3,2:(-64,0)
>> 3,3:(0,0)
>> 3,4:(64,0)
>> 4,0:(-192,0)
>> 4,1:(-128,64)
>> 4,2:(-64,64)
>> 4,3:(0,64)
>> 4,4:(64,64)
>> undefined

check_if_inside(chunk_buffer[2][2],player.x,player.y)
>> false

//=================================================================
// At logon (21,-108)[*1*][2]
testRequests.print_chunk_buffer_coords()
0,0 : -128,-192
0,1 : -64,-192
0,2 : 0,-192
0,3 : 64,-192
0,4 : 128,-192
1,0 : -128,-128
1,1 : -64,-128
1,2 : 0,-128
1,3 : 64,-128
1,4 : 128,-128
2,0 : -128,-64
2,1 : -64,-64
2,2 : 0,-64
2,3 : 64,-64
2,4 : 128,-64
3,0 : -128,0
3,1 : -64,0
3,2 : 0,0
3,3 : 64,0
3,4 : 128,0
4,0 : -128,64
4,1 : -64,64
4,2 : 0,64
4,3 : 64,64
4,4 : 128,64
// After some movement (21,-142)[same][same]
// Notice y values: missing entire x,-256 row!
testRequests.print_chunk_buffer_coords()
0,0 : -128,-320 //!
0,1 : -64,-320 //!
0,2 : 0,-320 //!
0,3 : 64,-320 //!
0,4 : 128,-320 //!
1,0 : -128,-192
1,1 : -64,-192
1,2 : 0,-192
1,3 : 64,-192
1,4 : 128,-192
2,0 : -128,-128
2,1 : -64,-128
2,2 : 0,-128
2,3 : 64,-128
2,4 : 128,-128
3,0 : -128,-64
3,1 : -64,-64
3,2 : 0,-64
3,3 : 64,-64
3,4 : 128,-64
4,0 : -128,0
4,1 : -64,0
4,2 : 0,0
4,3 : 64,0
4,4 : 128,0
// After moving left: (-19,-142)[same][same]

testRequests.print_chunk_buffer_coords()
0,0 : -192,-320
0,1 : -128,-320
0,2 : -64,-320
0,3 : 0,-320
0,4 : 64,-320
1,0 : -192,-256 //!
1,1 : -128,-192
1,2 : -64,-192
1,3 : 0,-192
1,4 : 64,-192
2,0 : -192,-192 //!
2,1 : -128,-128
2,2 : -64,-128
2,3 : 0,-128
2,4 : 64,-128
3,0 : -192,-128 //!
3,1 : -128,-64
3,2 : -64,-64
3,3 : 0,-64
3,4 : 64,-64
4,0 : -192,-64 //!
4,1 : -128,0
4,2 : -64,0
4,3 : 0,0
4,4 : 64,0

/* Conclusion:
	If we fix the fact that the center chunk isn't a center on spawn,
	the adjust should do its job normaly and no missing row should appear
	I am hopeful but that's my best guess.

*/