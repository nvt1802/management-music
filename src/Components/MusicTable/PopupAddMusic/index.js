import React, { Fragment } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { createMusics } from 'RealtimeDatabase/Musics'
import { Controller, useForm } from 'react-hook-form'

const PopupAddMusic = ({ open, setOpen }) => {

  const schema = yup.object().shape({
    trackNmVN: yup.string()
      .required(),
    trackNmCN: yup.string()
      .required(),
    singer: yup.string()
      .required(),
    urlYoutube: yup.string()
      .required(),
  });

  const { handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema)
  });

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = data => {
    console.log(data)
    createMusics(data.trackNmVN, data.trackNmCN, data.singer, data.urlYoutube)
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="max-width-dialog-title">Title</DialogTitle>
          <DialogContent>
            <Controller
              name="trackNmVN"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField
                {...field}
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                label="Track Name VN"
                autoComplete="off"
                error={errors.trackNmVN ? true : false}
                helperText={errors.trackNmVN?.message}
              />
              }
            />
            <Controller
              name="trackNmCN"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField
                {...field}
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                label="Track Name CN"
                autoComplete="off"
                error={errors.trackNmCN ? true : false}
                helperText={errors.trackNmCN?.message}
              />
              }
            />
            <Controller
              name="singer"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField
                {...field}
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                label="Singer"
                autoComplete="off"
                error={errors.singer ? true : false}
                helperText={errors.singer?.message}
              />
              }
            />
            <Controller
              name="urlYoutube"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField
                {...field}
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                label="URL youtube"
                autoComplete="off"
                error={errors.urlYoutube ? true : false}
                helperText={errors.urlYoutube?.message}
              />
              }
            />
          </DialogContent>
          <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="submit"
              color="secondary"
              variant="outlined"
              style={{ marginLeft: '1em' }}
            >
              ADD
          </Button>
            <Button
              onClick={handleClose}
              color="primary"
              variant="outlined"
              style={{ marginRight: '1em' }}
            >
              Close
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}

export default PopupAddMusic