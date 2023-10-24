


f = open(local_filename, 'wb')
for chunk in client.places_photo(photo_reference, max_width=100):
    if chunk:
        f.write(chunk)
f.close()