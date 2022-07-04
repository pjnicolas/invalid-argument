#!/bin/bash

read line
filename=`echo $line | tr -cd '[:alnum:]- ' | xargs | tr " " "-" | tr '[:upper:]' '[:lower:]'`
now=`date '+%Y%m%d%H%M'`
fullfilename=`echo ./src/_drafts/"$now"_"$filename".md`

touch $fullfilename
echo "# $line" > $fullfilename
echo "" >> $fullfilename
echo "Descripción aquí" >> $fullfilename
echo "" >> $fullfilename
echo "# Example" >> $fullfilename
echo "" >> $fullfilename
echo "Ejemplo aquí" >> $fullfilename

echo "Done."
