#!/usr/bin/env python3
import os
import shutil
import zipfile
import exiftool
import mmap

def unzip(f, loc):
	with zipfile.ZipFile(f, 'r') as zip_ref:
	    zip_ref.extractall(loc)

# Number of files with metadata vertion 1.1
v11 = 0
# number of files
nfiles = 0

# Create directories
zipdir = 'zip'
filesdir = 'files'
shutil.rmtree(zipdir); os.mkdir(zipdir)
shutil.rmtree(filesdir); os.mkdir(filesdir)

# First unzip main archive (final-final-compressed.zip) in the "zip/"" directory
unzip('final-final-compressed.zip', zipdir)

# For each zip in the "zip/"" directory, extract zip archive in "files/""
files = [f for f in os.listdir(zipdir) if os.path.isfile(os.path.join(zipdir, f))]
for file in files:
	# uncompress
	unzip(os.path.join(zipdir, file), filesdir)

# Process files in the "files/" directory
files = [f for f in os.listdir(filesdir) if os.path.isfile(os.path.join(filesdir, f))]
for file in files:
	nfiles += 1
	
	# Checking if file contains "pasword"
	with open(os.path.join(filesdir, file), 'rb', 0) as f, \
		mmap.mmap(f.fileno(), 0, access=mmap.ACCESS_READ) as s:
		if s.find(b'password') != -1:
			fpass = file

	# Exif info
	try:
		with exiftool.ExifTool() as et:
		    metadata = et.get_metadata(os.path.join(filesdir, file))
		if metadata['XMP:Version']:
			if repr(metadata['XMP:Version']) == '1.1':
				v11 += 1
	except:
		pass

# Clean up
shutil.rmtree(zipdir)
shutil.rmtree(filesdir)

print("Unzipped files: %d" % nfiles)
print("Files with metadata version 1.1: %d" % v11)
print("File containing the password: %s" % fpass)
