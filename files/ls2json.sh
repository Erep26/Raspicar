#!/bin/bash

lsToJson()
{
	count=0
	tabs="$2"
	ls -p $thisdir | while read line;
	do

		if(($count != 0)); then
			printf ','
		fi
		count+=1

		printf '{'
		if [[ $line == */ ]]; then
			printf '"name": "'
			echo ${line:0:(${#line}-1)}'",'
			
			printf '"type": "dir",'
			
			printf '"contains": ['

			thisdir+=$line
			lsToJson $thisdir

			printf ']'
			count=1
		else
			printf '"name": "'$line
			printf '",'
			printf '"type": "file"'
		fi
		printf '}'
		
	done
}
thisdir=$1'/'

printf '{"ls2json": ['
SAVEIFS=$IFS
IFS=$(echo -en "\n")
lsToJson $thisdir
IFS=$SAVEIFS
printf ']}'
#exit