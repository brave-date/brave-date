import React, { useEffect, useState, useMemo, useRef } from "react";
import { Box } from "@mui/material";
import TinderCard from "react-tinder-card";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BoltIcon from "@mui/icons-material/Bolt";

// TODO: redux selectors
// import {
//   conversation,
//   selectedMatch,
//   selectedMessage,
//   authUser,
// } from "../../redux/appReducer/selectors";
//import { useDispatch, useSelector } from "react-redux";
const db = [
  {
    name: "Richard Hendricks",
    age: "23",
    url: "data:image/jpeg;base64,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",
  },
  {
    name: "Erlich Bachman",
    age: "23",
    url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRYVFRUYGBgYGhoYGBgaGhoaHBgcGBwaGhwYGBocIS4mHB4rIRkYJjgmKy8xNTU1GiQ7QDs0Py40NTQBDAwMEA8QHhISHjQhISs0NDQ0NDQxNDQ0NDQ0NDQxNDE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ/NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAQIDBAYABwj/xAA9EAACAQIEAwUHAQYFBQEAAAABAhEAIQMEEjEFQVEiYXGBkQYTMqGxwfBCFBVSYtHhIzNysvEHNHOCs4P/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAmEQEBAAIDAAEEAAcAAAAAAAAAAQIREiExQQMTIlEyQmFxgZGh/9oADAMBAAIRAxEAPwDQ0opSKUCvIdpAKdFLFLFAIK6nAUoFOAgpQKUCuYgXNInUk1G2YA5R0m1C85xYLMCYN4i3cZtT42gXbEArhiA1jMX2gOo2vygggUHf2pzGpjrEbRAirn0cqm5R6WXFNGMOtYXB9qHKHV8UW6U3L+1MWcSeokUfZyHKN8+MAJ+lcuMCYNj0P2rEv7QOw1Lpjfb7z3zRDhfH/eNDIVIFjMjkTfltSv07Ie41NdFMXEHWnjEHWs9HssVxFJ75etIcZetPQ2cFpYqM5hetNOZXrT0E0VxFQnNL1qN82vWjRLBppFVf2xa455aeqazFITVJ+IrTGz4o40l6a6h37eK6nxv6HRx4kvWkHEl615++Ybqat5MO/M1p9lPJtv3kvWkPE161lDhMOZojleHkiTR9qDkMfvVetL+9160BzORINqjTKmn9qDk0J4uOtUM5x0IQNz0tvQ7MYDKkyQO6x8ATWcx81pJ1C9oMzaKc+nByaHPccZlI+Em0nkOorPZrFLGA0ePOocXP6wASbSD3gnnS4jBmm8kgAc4A3NaY4cU27J7wqNpJ5n7dKq4kztb5XvTcximYjfx+9JmbR4Aegq5CtTK0ERMc55D70mGoLmbSDB5T+TTUwyVBaYvfv6UxLMO4+t+flQEiaxHTvNEMnmijGPltaq2M7BgCLb7bHx/N6a2KFn1mNr0r2fjWZXjTEwTJq63EWi1YnJYupt79OtazIaSo7V+nWs7hIe0/7c5pxzT1cyuVDEUYThwjajhBtm/fv1pi4znnR9+Hd1dluHjVtS4wbBQj9TSLgueda05AadqhyuRloI2quI2zK5ZyYk07GyLrvW3bhg3AqtmMMfCRRx0W2SweGs/WrLcNZBetTkcuBeKvLkw14q5iVrBfsjdDXV6F+7V6Cup8S28KdaO8JUQLUJK0Y4bShr2Iknai+TFqohZq9lQaVNHmMKTSJlRFXHS8U3NdlDNqQZzi+gEFgTGwBIifrWYz+AjCbhrhQO6In5ii2fx4YmeY5bCZ9b0DzuZtP6gbRRj6dMyuVUgyYYAwD3XqhiBg3fNXffalRQb6h3b0pwguliQS3qw2LHoKuVNiPFxFgPu0Xjao0QtduZvvT8lhlnF4g87R+Cat4uERMGx67+P1o3o9bcuIfdhDbtG/Ww+/1qnmcKCJvztRB8uVAuDYX6TyrsHLGZa5+QqNq42hTI7GYPhVfGYzBtHLpWn90KF8Vyv6huN+8VWOXZZYdbC0JU2Jo5wnOOWAADEGBq5UFS4NW8jmmRtS9IIPO+/iLelVl2iPQ+DlwVdjb3gRhtHKbWI29a3GXAIFed+z+axcUdtAE1KGfqSxgAeJF69By6EQaienVt8ARVVMG5q070qAVWk7Lh4dqemCA1OwKlxDTkJMQIoTmUBarGNmDFUMJiWvRTiY2FE+HOGFD8dezUGQzBRj0midUetLpFLQz94Cuq9wtPDXFFOHOKHYiVYyeGaxi6PJjiieWxxagaYBNFMlkyBQBRMwoNUuK4pZSEIETvz7u6lOUk70K43OEqkEwSRtJnlebUU4zWYIWdUifO/cBvVB8IMGgbQRYjc6fzwqzncUyr9Pvv501sY3ed5BGxOozYUlBowwri+wJPofnVvFeVXlyt8hVfMppcDy9f7U7QZBnexHQju+9VUrC4AI7AJMmb9B06xVvL4OuAqyw6myjlHUxzq5w3BgSVJG6wCTPW1XcrkShDwVDLsbbb77f2rO1rjihThrQNUGm42W0ii6cQwwDJHmaHY2aRiQCL0u2nQcyTUGMkiKsO4E+NVHzaC00ItgA/YcipMKNQvScRYFwRsQPvTcOxFbfDD5bv2YxyGXDvAgjtG1pNgIO8X763mHmDFhWA9lsSYRVL4hBKgHSFI/U9thPXnXo2VwSF7Uajv3UoKhbGanYOIxPdV44Ap6YQp6Ts1HtSF276cq3irJQGnCUMUWpmXiaKHAttVI5fSaLD2mx4ihQUzaiOIDFNyOWLG+wNAVINdR39kHSup6G3h72NXsgs1B7qWrQ8PyNhas5VkwbVocsogVQGUq/giBTJFjWYxQPjq6gA2kA2uYuOc0exxY/njQviyKqFiuoi43YHyopxgGlHkQwmDIPSxvuJ+lJmYDMwACm4AAgXg7/lqlz+aVmI1RJmCI328tudUMUkggbc+6kEeBgF3a9gsk9FHSrfDMD32Jp5/D5bTVRQFkLPagfe/lRr2Oti3FyYH3NF8PGdtRkMjoOnlz8ulTcUxVI0s3gLSe+/LvoyuBM2qp7tVJkCTz+1ZOl55xnCOGyyCC5IWQbxvvB6cqfwDAGI+nT4xyijHFckXIE2GwuY8OlGPZzhYwxPM/Kq5TTOY3bJ+0eV902kbRWdUdqIBMTW99ssvLBuW1ZZMqAaeOWoWWPYNxJIZTESu3malyGV1lZaAxCk9CTAJ7rj51Z40nwHxH0NVcsg1qC0Kb879xArSXpjlNZPQv+m2WXViO06gAgM2IJkkddhXoaxast7OZQ4eEsgK0CdJMG3MEmjQxDSlKwULioxi0PLnrSBj1p7LivnEqfCxRQsMadqPWjZ6Hhjiq+LiihWo9aYzHrT5FoQfEFW8njLQFmPWkDkbGlyGms98K6sr+0P8AxGuquQ0wGAva861eR2FZfA+LzrUZP4RWK1wU+aq4mJFQDNVWxoQ1ChnGM57teyB2gQDyBsJI57/KubNEVR4nmJQkx3jfn/ai0SMfxbDGo3LQvxcy0zy238qHKdUMFAMx01EA/WKv546mMP8AEY5C46+tCihDi+0z5/nypw6vYOEw0ixnf+XuM86vcExdDg7MrEMfOhGFxIiFIkSPGi+RwyX1z1N7nbeetqmz9rx18PT8LElQeoqnmrzFCeFZopqDPbYLMgTeZ8/lRTWGEg/OorWA+KoWSaI8Hx9asQLKYH3oVxFSwMWA3PShWa4miYZw0lg3xQY+YuOdEirYO+1DJoEkHrF4rGqRVDO5xoCIulNwg2BA/N6bls5EKwjodvlVcemNylqXiWGGCL1cD1mosrw5y0KJYTNrKR37U3iLzpXvmruRZwCEcaSACfHkO8davHqM8u69F4HndeEpJm1id47++iXvax2Q4guGipOwqf8AfQ60iav3opfeisp++B1prcbA50bGmt9+KX3461jG4+Kb+/xT7Gm1/aB1prZgdaxn7/pre0FLsNi2YHWmnMjrWKb2gqM+0FGqG3/aR1rqw37/AK6jVCzgHtedanJfCKyeAe3WtyPwilA7NC1DkXeiGdNqo4Tb0UI8Q7VVx0DyOUTHXepcybVVwl1mJI7xvQAPjWEgVCLE6tS8gykcqC5jDUQqsQSJaQAO4CDW5z3BpUqAWLAQSTLMOpO3cNt6yuYQOo7JVroZAGkr0HhFXrQCMDDMqOc1qcpKoj/w9h+6dj60Aw8PtoAZA2PXe9bbhmGjKQR8Q27oFRlV4RWRh2QBcse+/IRPL7VOme0lVDf8Dl5nlQnM4DYTlCTAurdRynwvNRoSWAAk7C8Qd+XOp0vZ/HuJMyhAYBuI5jaaq8N4XjP2gmlTbWbnyG9FRw4KdTCT4Tbzq8cw2wt8op70JN3dZXO5AoSNXy/vQzNYDRO/1opxRDrN2PMyb1WduVVKWWqXgfDnzLlEQuQo8FkgamPTejmc4O2WAQmSLzEDyrTf9LuGlMLExSB/iNIPPSsgeUlqm9scEb91bcZxc3L8tPN8bGad67DdutdjL2j4mnZdZNZVrFrDnrUWOT1ong4FqpZ7DilowsuetNLnrSNSVSSlz1ppc9aQ01qAjdz1NRBj1pz1GKpJ811NmuoDd4B7fnWuyHwishgfH51rsh8IrOKJnjaqOWN6uZ7aqGXO9KhJnUGk0OyXxVazbmKq5IdoUQNjlsvqAMTaCPmD5ECsxxz2afHK+7y7STDvGkiAADLECO/nFbThAsKPotdPHcY8tV4zmfYvHwChaGQkgkGQpI7IMxO526Ub4bkNCSwuLUb4rxdcfMe6RpTCUlo2dydIIPRdLjxNRuu4rm+p1lqOv6W9dgPEsmHWNmEx5/agHD8Iq5VgQyyb9eo7u+tZmMIiqmZAiSJjbqPA1Eq8sflCBIM9Inn86GZzMaZH/NJnOIqtiGHkD8waAZvNazafSrkRagzGIWck0c9juCDOY+hmARBrfqwmAqjvO55DxFAESaembfAxA+ExR1AZWH6YsT3+Gx51eOts8pbH0FlsqmEioihVUQAOQrI+1o3qv7Of9QExIw80Vw3sFxBZHPf/AAH5eG1O9psZXBKMrDqpB+lb2yxhxsvbzfHHaPialyYvTMx8R8TT8lvXPXQ0eWS1DeKpY0Yyi9mhvFlsaAyz0hpX3pDTSaaaacaY1AQPUYp+JUYqknzXV1dQG5wPj861uR+EVkMI9vzrXZA9kVnFEz21UcDnV3PbUPw3CgkmBRQZmdqr5Q9sUmNm1aQt4Enlbab8r0Dxs8QVBYqzGAFI0kMbNqFzTmNVxterZPO4eEgbEdEHVmC+k0J9q/a5AowsInS47T9pZGxVNj4m1YP9nnUzOWaCFBWWB1QVE8rSSKuM5ZdbIGRCz9pgLkDsjeb3jurbl0eP0Zvd7E/ZQf4j8gEBC81VmYqCfUxynvrUNWS9jsdnfGdhGoYZQfyDVcde1qv31rDcVy538msu+1XHND8ykiiUSDQrO4kTUqZrimDBmhLYU1oMcBjQ7PrG1XKzsUFWqXERseWx+0xer0VJl+GnHnki/Eep5KPqf708b2nLwGwk3IAa20g+n9xUb4hXtCVPVTH0ojncoiTAYCSAQAQY37WqZjl8qpInO5Uc99r7cx9JrWJsT5fNFgNUk9bXk2m9EMniKDdgKFaGTTHwPJWOU20tHhUiIEYoylTsZm3fSuJ8W9yR7ND+LCxrP5biL4LQjagYtJKmeV9jfeaJY/E0xFMwp2PSe486XHQsAXFzTkwpqRluany4qpEVH+yUx8rRURFRvFVqJ7Z/M4cVVFE8+KFiiwj66lrqRtrhnt+da7IHsisfhnt0Tx8+2kIFYT17IIHMt07h1qMZteONyvS/xXiSLCzMmCQCVXrJG/gKCZtnAlNWskSsai8zDoV3Ech1qXNopVEdmDzIUQFRT8RZYOmQBBJnrAqtjcQVIVItsBdF7yf1v37DlNXI6Jh5r1Dns6UCuzl2EhVKFVBIhg38REkeVUBltY1mSSe38RVBaLkd5temNqxnAMnSr33khtZJPMnrV7G4sgZAiRoCiGMpsdSx+qZ+LemJN3r+x2Gzo5DkGYkmGBH6WEgytXM5kTiL2QS7groZjCRJZ0t2l0qwHQ9bVVzGOmKyKqlFRWgfETfWQNhaTHcPKjXAcAq7jWXT3athmTADMQRH6T2IMdKWV/HZ59T9UTPD0bDwwjaWw1AR13FgCD1B5g1LluJFexjgK2wcfA/9D3Uy6klbE7jke/uNOOICIYb7qfy9c/rGXSzh4gLG9qD8bwTqq02AFjQSO6ZHodqlOBrWWIt3f3pL5QKy+UESao5nJF3sLUazHZBjltNU8PFbnzEER9KfZXKK2DwMG7fCOXM/nWiGMiIh2RAPTuHUmlwXCKA03+FRdj3AfeoM+hMF99lUXCf1PfTRbtk+L4bO2sLCgQqcwLkmOZ60Hd+S8xpAHIc7cya1+ZwAcNnidMnaTbpBBne4NqzePgGcQnTqJExYBY1Ewdh8P960xvQ30nymUwsZGwxqDgalm67XD9BYnUNhyqplmbEuz9sBVAOonSoCgkjaABen5LGLOdMjWdJInsqTzAuRt6UzO5FkYEH4iQy7AEMVAJ2JJU1ppV82sAq66TAYcwvaEb3QQw8f712DldWHrNzq0gmwVF06m9XUeNLl8v2QzWWWLnoEjs+Z9T4VK4cqyl4EltA94QCTqgjTBg+NI9RRXMGTcRyDbx41bwXt9qo5vMyxBVRHQQPFSoBHhStigQVBgRy5mZHgYnypIs2Js9qYjmmB5Eikw2pyJ/orZ3aha0Uzm1ChTqD4pa6uqQ2qK6lWVVbXqA1bWiZuI359acMXER2TSqsrBdQWdJ5KijsmbkCOc94jzPEeyG1Kz6RGlQAhIBLEARq6AcxJ2ArmxBoBwdTvpksoYlJHbc2s5MjnAEztDnTsxnGa0bk80yvi4Qc6jJVwZ1OoNj11Amxm4FNwMyqFmbUq4gBLJEoyzrWDuNUGJ2IoXwzLq6uxfSZgWOkGR8RFxImLcjRD3hC4vvu0VGkA/pLMFZgBABvv1jxDG5d3/ZmSRwuI6FCG1S0WZWgNpMQpnR2Tf0p3D867vj4gJT9UK0mFsQFNiBIPcKo5D/DZ9YkKjalmzEAhZ6gGG8qd7MBlf+K4leqPZpHgb9xo0i9an+V7OZ8vpILO4YaWZVDACeyCCSRJm/StJ7PYYAdgsTpWA2sdkajBjaXIjlBrP/sqKgIexdg2mC5AMKi33IEk/DBFztWs4VhhcFIXTI1RMxqOqJ571Gd6H1LPInePwVAw6+lTzNMasmaIg8qcmIRYiT4imuIPOKWPGgIcVmP6PU1AcN+oXl2Rf1O3pV1VtT8FLyfIdKAZlssqAt+oi5JJPqeVUM9e9EMfEm01Qx16igiYSdgiB4Vis/kzqZjqNzLxqUmbzF1vNr1uQsLECspxTKumK7q2gN/DOokRIgb71eF7OBSYrRoCsLAwGCobbmw+Z51fzpDZZVIOosCZ3GjXM3kXcelUcQNqlpIAOoaNMgmTtaefkKMcMCFG1omIbaCzsuoAkEWYdoSDflFaxeNnyEZFlZWbEExAZiTM8lRRuYFpsNzareUbFZDpd1RTCgMZJ30KoI1GDPrVbPgYbg6AitbSYxFBBkkSTY9mb8qvYWMhw2XUqAmSUxCuq38BB6bQopCX4Aw5ZwGBYT2hzI6wNiINWc0hX/CEWJYG0MIBB9BP/sap5RhqL6iGWIIPPp5Cp8z7wguwczEswO3STQnHy1NlzuLd46Ed39KnwedD0SWB1AWkk/yxeOcgr61fwW/PG4py/CMv2hzm1ChRTObUKmjJmdNdSTXVIbfL5pXxE+BmCvpYYYUagNSgrsfhN/5u6q74ukMQhCsuuUYqUMjDYDcEahsf4qg4lmDhrgBT2lLODyABCr6lWP8A7VPhZjEILKiqkMCpvrLwSpBPPSYEDbrVO2/8DOGZ9VxDqBYPIewBK9d4LA38o51d4y2nSe0QUA1FSusREid+zp8xQzhTIuMSw7O4LKX0zyKzfxPSifFH1qNU6Qx7RnU7ELIUHbYWiwPOiIx8qnxXML7pO0GfSFaNiFJAk9YKi3TerHCMiSgciQblmIRFG0M0yekCKG8TXtphkaYjy1Q1z0vRPIThsVICuLAkAww5XtB2nv6TQMe7bPhYz2IjlEQLr1qNaLoUzA5mWMiZgRe1b1VAAAG1vSslwREbFRlQLqguthoKSeypHwswXbYqRtWtm9ZZ+6Tld+IW32N6Tcc6V/y9Q+NQk8d9MTePT504GaWQbTQCb/m561IrVEp5U6aAjdfzeqziTy9atOah035UEQragPHVAQsWdYFipIkmwBA3G3T7UeZqHcQwAyspFiOsfhp4+nLpjcMFu25LKhspJOpjsI6dfSlxrsGUAaQus7AE77fQD+tSYuG6RFwxIWRDK0CRBuG27tqq4yaNQVjKnQSNm6x6D5VsreruCHF8nhjDRwW1NPxFRMTDhRcLIG/WLwapZMoUMgM8wVJKmB/DFiZ3B8qtLgnGSdcsoIc4jDZYClecG4Av8NDFcJqRgDqHZIAN531eRHnTGV+d+u4aGDO6kAp2gD01R89vOp8xmwxDFTI/nJ2/1SfnVXJkkOBclgTFyYmPqfWruZLaYdCsgQGUgGLShIkHu/rFFTJ+KhJBAjUOQE+nXpUuDmissbjYjaOkfOoWeADv2j5hgKkKfFzkdN9iD6Uk72tZnEDLI2ImhdS4WKNOjp0qGnWZa6urqQafibhgXKOgldBKzCxEDYAyJnvqLAxVddCrpHxM57TmLk72tJgSTG9ScQzSuG1o6P1DH00tcDzqrwXEVjial1FcMlRJBsRJBH6gNRE9Kfw6b1e4jyGZCMxixDABrlybSw5ijWZzigqipqcMSlgVJfTDERLPsI2sKAZDB14pHaNpEAFj5d1/StFiZlFLh8PtgmJSSV0hQCxIKCwMi/atT0eEln7AMfNB8yrOCRAVxsTpGmR3wAfGimYK4hZ50KPdptJiNIYgWA7NwOsULyGNOYdzpEgm6B1kno00XxXV3ARQdSkPoUqCZJkA2WIQ8halIMfLYPezOA4Z2xDq0AIh3s0OYYiSpGmJ61oC1waocHwtGCgudQ1Xse1tPeBA8qtO1YZXdZ277diGmOOdK7W/DSBp7/7UgZq8f+Kep/IqHE3ApVbpNBJY6VwPX50wP1j6U7w/rQCTamFaeaa3f9KAgcVVxKsO2+1VMYUBmM7CYiM82ZioBJhR8JAJiNXePhNCswuonR8I/UxAk2k/S16M8YQFx8Ekc7ao5BuRv5zQbHRlsBHVWiR0Ph/Stp4N9J+Eu+tkVQ+uF+EsDFxG0QfyKoYyEk2AKk2HM9PlU2RxnV1gtYyAsAHmPXwrs/hlGg/qVXmDYOoMX58vWqPe8Tsjm9AdBqGpplDE7W2vz/pTsXMWIhjNrtN/CN6pZbEIZolbGItsZ3olm2AcOI7aBh01GVJ7rhj4mgsdaDMBZkMSIEgfnKJqdNUFSPh5zyJ1fY+tRYJBNxeyjcRY99ckMRPLlPLpG9JKrsZ6mKkpM2NPmSRTiZ5R3U6murq6upE1GeZHVNKtABUAhdbmdpXdQIEm9C8nqR30jtINRCiYA31Ry5GruZ0INK4ziYJhRzANiGmCI+U7VDwUlffwwA0ICQYiT2TB3EkAj+bupui38ulfI9rEGidRaVA3E8p6zFaNcDWPfFlLspAw9MBlXUhAM/woTEWkd1ZzIyrh4gqwnuIP3j5Gi+dxNKDSSCjtBE2D/wCIhnrJYeK0Lx/h1A/hiBmxlPJA6E79gsSPMFvMDkKOvkNI0Ge1pWB8Ts2kEk8kUsBaxO07jPZDELYzAyNSqCqbvJmAf0jtfatPw9B+0oiuWUKCwY6tBQGF1C1jG1hqii3UTjd42bamIAHLb0prmmO9Rs/4L1zsy6vya5Se+oC/5FKhFAS40T5VGHp7tPp41AW/IoCwDtvTtXh9D86rB/CpFe34aAkZvw0xn6fK9M13/BUbvf72PSgOxG/Iqlitv/SpcV7dPWqrvv8A1NMBHGsDWouez/KTvFgB4/Ks/iMYA1Na4UiwjzrS8XAKX673t31lFctMs2kb3O3K3U1pj4WyO+mD0kr39PS9WsTHkLzlE8TAJM98kmh+KwB7rGOQnerRwxoQ6jN/02FzF5+1X8Ca7U8sT8QtF/HrRXM5nXplFAAIAExLGbydpJ2oMrESO+D5HajOYxMMJCqDbc69XjvpFAx8qlhvLju0+cbn5/KkyyD4p528r3qICV5Xt0I8qkwmhQfH7fYGgkONsT+E/wBqeGlR3VHjlSN/UX9RvVh00on81/S0/nSi+JMmupk0tSGyxP8AJT/SPpQfA/y8344X+566uqq1/mLg/Fif6E/3JRnF/wArMf8Ajw//AKNXV1FaYeAnAf8AuH/8Tf7aNey3+f8A/m/1WurqWXiMPK1bfb+lVhv+d1JXVglKtLXV1AM/WfD7UmNS11AMbfzrlrq6mD22qrifYUldQDX28xVVuf50rq6hIZxn4D+cxWXX4D/qH0NJXVpiEOLu3ifvWiyX/a4X+rE/3murqv4Jmx+rxb61ZfYeFdXU1YeVV5L51Iv58qWupEizP6vE/Wrec2w/9A/3PS11FJVrq6upJf/Z",
  },
  {
    name: "Monica Hall",
    age: "23",
    url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCAoNCgkNDQkICQkJDBkKCQkKCBEJDQcZJSEnJyUhJCQpLi4zKSw4LSQWNEo0ODcxQ0NDGiVISkhATTw0NjEBDAwMEA8QHhISGjchJSs4NDQ0NDE0MTRANEA0PzRAMTQ0NDY0NDU0NzQ2NDQxNDQ0NDQxNDE0NDQ1NDQ4NDQ0Mf/AABEIAMgAyAMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAIHAf/EAEAQAAIBAgQDAwoFAgUEAwEAAAECAwARBBIhMQVBURMiYQYjMkJScYGRobEUYsHh8CTRBzNTcqI0Q4LxJZKyFf/EABkBAAMBAQEAAAAAAAAAAAAAAAECAwQABf/EACURAAICAgIBAwUBAAAAAAAAAAABAhEDITFBEiIyYQQTQlGBFP/aAAwDAQACEQMRAD8AqeIO+t6Afc+HPej8RfXnbpQD+/4VMZm2HOop7wsecH1pFh999OdPuFjzg5UTi9cKGi1YIx3RSDhQ0WrBGNBSjGxFROd9RYbk7VIxAGpsBqar/lPxn8DhGlvkmkPZ4WP1mPX3AVzChb5X+VcXD1eKPJLj2X/LOq4Lxbx8K4/isR+IlkeSWWSaVjJJNILlyaziGJkllkJd2YtmdixJc0KG19dj1W4y0UhZPoOGHEfnQ5IXvEx2rMVjpJiM8hIA3J7zVtDDnjYWkD2zJci9DLg51vdcpPP2aNoFM2XDRyXyylJD6KyEqGqF4poXsxdCNOdq8dMptY3HM37tMuH4mOW2HxBsGFopiDmj9/UV1nJBHBuJZXCPYqwyukiEpIOhHT7U/mw+Uebj7TDnvPhZF7Qp7j9jVWxfDp8PMFYl1c3jlBvn+PWnHCuKkFYZvVXuuTYtQaHi+mGuGaNWiPbRA3KO5Dw+/nbx+YppgcQ/ZstjJABeSCSxaOlLTLFMrqbKxzhsoytf6e+ippgkisgMaSNbKGICHp/auHsYYjDJIgeMXdBYhWuzD9qJwK6Dw0pNhsZYhg+UFrq+2vT307wsoZibWY6soW1KwBhrQj59KkPy8K1NA41A8KniFRAfCp4xtROJ0/grK2QeFZRoBznEHfTS9L3Op38TR2IO+mvI0C5+dERm+HGtWDhQ84KQYb5eFWDhP+YKIC9cLHdWnyHQcydhSPhfor8KexjTxtqaUchxMscUUkjkBI1MjEmyrauO+VXGXxmIkkbOEXzcUbHSNB4ciTa9W3/EPi3fTAxyZUiUYnicgY+Yv6Cf7j6VvdeuXYmYHNuATcDfKBt9TQ7O4QBIdSLm53p1wbhefKzKQDyY3pXgITNOAASqnMeYWr7w/D5IwLWO1qE5VoOKHltnmH4dElsqi401XWtcVwtH20JGnKmiptpUoS5Gm2tqlZr8FRSsXwPErqIHkjv6UfnGX4UmxODZNcjgDkyMpWupolyN7De3rVK+GV1KsLqw1oxyE5YUznvC8VHiIThJz3iubDyZvRI2t4jpQuIiZGBdbPC+WQx+oeTDw5299SeUWB/B40sgKoW7SO2mQ0eAMR2bXHalezYnZ7jSrWZ3F3RrCVeN0NigGaM5rZb/AMI/8RUGCxTZJMPISVVezBfXJrp8jUyQlMo2YI0Ul9SzDUfX71pJh1ZgwAX8RDm0v3v3uPrXDfIbg7sJAy2kyXY62a3P+cqYcLxLJIqG9l70ZY+iBup6269CKDwDASYZ2HdLZHvuwvY/G/3qDDu8U80TAFsLKQDrZeh91APBeFYOoYDQjNpWEUJgZgyLuAVzZS1yp50YRQOZqKIjH89qoQPhRMY20ogZKg2091ZW6isonHM8Rz+3KgXH1Oh3o7EDegpBv08KJNm2G38OZ51YuEDzg9+1V/D8unXarDwcecHM0Qdl74WO6tN8RiY8Php8Q/8Al4aJp3GgzBRe36Uq4YNBQfl/ixDwWRL2OMlSA23y3zH6LSDnKeKY+SbO8jkz4yRsZiSxJLZv2sB4Ujke/aNqM62W/SicdiWeSRmN2kYvIRspPKl7MbE31Ya/lpooWTLP5KYQGJpCLl30+FWuJdvpaknCMRFhsFhVYSPIU7SQItxHfrTrBYzDS2ySIT/psbNWedttmuFKKQUg259anA+mtvarRRvY3INrVMo2006UtFUSwptyAopQNNNRyoeNtzvY1MrXGux3tvQCUvy4hzkPbRRyoHhcbdjG1tRFe9/Rs1vtTzynjzRzcwq3vQWBhAwmHUEA/hdRsWJa9XjtGeaqRFIueSZyoASbKE2zXH/qoI0vCNLOj9oAVPd5afO9F5c0nEFuAnZxyKTpv1+VRw6SItxaaMxk5fRYbH6/SnJLQZHhw+FLILPE/aOgUERX0P1Cn41DxOG+Oje1ziUEcgFgHuP7j/lTHhaq5TX/AKqHs2Ja2Vx++U0LjgFmwzMpKhuzcFrMobpXBYTgRIpy2OaNe0QtoGtofplp2DcA23FLyi3Q95ljsHsveykW+Vj/AMaNwjExspIvGxjN/Clo5kiiiox+wodRqOvMUVENqIpMBXlSKKyiccvxB3+dAv8AL30fMDrytQbxnx99FCM9w+4qx8GHf8L0hw8RuOtWHhHcPjeiwJ7Lzwwd1apX+KnFFeXDYFCCMIv4jFHN6LsNF94Gv/lVph4gkEEkjEARIXBNrX5VxjjWNkxE8juSZJnMkl7nMTSj32L3bO23dBvq1bwRh8Vh4yBZ5VQ321NeAZFJPPlvTLyYwxlx6MfQwvnm9/Ki3SsWKuSRbMfxXCYVjCsaFY+5ol2kNJXxeClkDrHJhmJ1kVLLRU+Ew/4mV8QsixSIwEguUVuQJ5DlQvDuFYNMPipMTiYElk0gjhYs2H/N+1TSVF5SldVos/D5roF7QuVO53ps8bGO6nvW7vKqt5MB2U657ebVlv39dKvaxhYFHrlbhfaqUvdSNEfbZUJsFj2Yk4rsFv3iJLCiMJw7Pcf/ANV3kJuCp9GlvHpcV2gTOY40QyPZbu/UCkPB4MZisY2GwsbviUVnULIAWC6nUa/eqKDfBKUlF7LVxbCYuOKUNJ+LgK5TKi96K9L+HTA9obCyxZIxy3qIcYnSOTDzK4lJ7NxItpIT0b+9D8MPdk5h5BGDlPd50YqmLKSfAwazY/Ex7NLhLqA3s/tahnkcMrqdcokP3/StnP8A8thGa4E0WRjpz3rMOndkVt4Q0ZU+rbX51UjY1wZKxSLaN+wl/EoQpuynW31NTcbjDwqwIzlro3rIR/e9C8Lezx5lIWaIxO17arTPEJnw0ikgldgqkGloazVZvNxPYjMvZkm9m00+7CisA+YOdg/fBLel1pYjj8KFNwc5QDNdddvrcVNwSVnD5hdowIxdhy0oMPQ5QaryvtRsQ2oZBrtr1ouIbUAE6r9K8rdRXtMA5W43+l68SO/Ktn38a2Qf+qZEZMmgi20560zwy5baWFBYfl9QKOTb36UWKmR8XxVsI4IJV2Cm3qrv9bVz50OjsAC2oHteNXjjbKMNJmOoIygVQsXMztfVU2HVqStlU/Tsgke/u2FtqunkVhf6LES2u0s/Z352UfvVHP0Gw5V0XyJYHhEgHpR4lgbbrcChl1Ep9PuYbMVVSt9+VI8VEZZAoGYk91VXRqa4lCz7mw5ii+H4RRdgt2675agpUa3G2PPIjgQFs4BMYLt/uP6AaU74thSjjTKORGgajPJqPJhwVW+veb2qZcRhWWM6XI2/LRStX2K5VLx6OS8Swsr4ssWIaMlFGUEKKI4Jh58FI0mGi4ek7nMZpMOxf530FPeJYQBw1tRofzVBh11AtY32FFSaC8afJTPKjC4oYgYiZlZ3bMWSPsxrS3hcgyspOiMJAa6JxvhwxODkS13Vc6HLzrm+DRkmkU3BPcJPq3p4ysjOHiMMawWXhkh7l1yEhdFtqP1qdzlxkmuVGYSZgvo5loLFBmwkRIObD4wJrqVvp+tFzNcxtqx/D5bM2i2t+9UIh0ZyI7oezKASLzzcjb+1OTJlzNdyCM7KPWHP6UhjfuWtdbZST/PE024bPeMKx2QxgHvhv4L6+FEIMVypKmYBQzIG30Gzfz2qk4KcskqqLKJDc5bZdf3oV5SbFTcANGWbQtb9rURwliJ2sdC2Yj2qVhRZV3Hgd6Li5fahEFFx8qCOYSNqyvAa9rgHLH/h9mtkG1anfrW6e+nRCQZBy8DRqbL0zUHBy8OlHohttRYELOKoHMasSEkcx5uS6W+9UPExsJZFtbszkAG166HjY2eGQCwkjbOv5SKqfFYbzq9rLKMzEbrS3RVK0IiNTpruOlXb/D2XNDxKH2Sk6j36H9Kpkg1bXnbSrN/h65XiU6cpcK1/gQaXJuDHwusiLViY8pOm/Ot8Hi1TLmz+ckEYCrcJ0v8AGisTFm5a3uTUMESh7mwJ0ANZbPQLhgeK/guHmeZMQcNcsWjw7StGvMm1OYsZh58KcRBKs0bpnjdTdWFVjyYmPaTxMTJCuqhrsq05bCrDG6wgRxvdiiaC5p1JpE3FN3wLcU6yWOXVthUOGwvfHd05VKkDBspFwToctMsPDsdid70qZXQNLEqrtYHQ1yieFRxHHxgbSlFB2bXautcRcBlW9soua5IsgfjGLJOkjsy/mIOlUhyQze02xEWaDiCXsyoJAdgxU3/Ssw0wkSE7XYq9+v8ADRc8dsZItrCZTGt+hXQilOEBVypvci0Yy+jpetBk7G0agGYFbnLnUH5H71OGKxM4FmicSEBrF12P61GjZgHBBDLnFt160TAoZWQk2ymNlOioD/DQChfM+QTDNYJOGYjx0+xojDSmNJpAdUCuFza6WpZjTa7km2dc0e400P6UbgiCkg/1CRfwJ/goBLtE1wvRhmsPVouM0FhxZVF9FUAH4UZH7/jSo4KU1laKayiccwO4+dqkT36VETv9akQbfwU6M0hjg1vb6Gm6oLbW5ClGDYC1NkkGX4aUsrsaNUDTxgG9rE90/mqqcaVVkCg3zG7Aa5asHF8ZkVVU+cfYj1KqeJkzZ2J2GUWpW+i0Y9iOU6nYd69PfIWQLxjDg6drE6D/AOt/0pDIbnoDy3ovg2K/D4/AznRYJ1Mh/Lex+l6dq4tCRdTTOq4yVEW7nKt9TSGfHvNJliAygZo4wy52A50/xkSu+U2ZDdL+z41W8RwbCpPG4DrKmoIY2BHMfessKPT2+B3guI4nBvG4ik7ovICMyuKu2C4lhsXAskTA2HnIy3ejP9qo/D3xkjhe0MhUZAZMkifatV4PxrCTLJhJkxKyvYwO4ZtT1AAt76dq+ANSfuVfKOhqiMBYbaqa3JCoSbWApbw2aa6LKiRuFu4Rsyqakxc1+6DoDc9KlZwDjpTllY6EKWrkRZhiZZrXCS3J95rqvEmy4aY9Ut0rnMuGC4dri7SsZCNqeBPLsOxzZkwco5KELXtltS2e0eIY6FVKyhTrl5H6GmGCXtsEyC7SFNC3qkfwUtx7a4ZzoJCY2X2LftWiLMslsaYZsisb3OHlzMpt31bepcNNaSMcmYxOb95TfT9KFwxvmBUaqI3LN6VxoahkcLK41BKiQa6uV0PxtROPeKxkNMoAK5syj0Br/B8a3wRt2ety1lC2uW1onFZJ4nZhcunZk5dGuL/cUHCwWVVOjqQSfZNqQZovWGYMkbqbq638Vo5ANPHe9JOBzXEiXIUtnQnof5en0Y0215g1yAzcD5Vlb2+dr1lEU5VfbSp19XS9QKNvfU6DQab8qojPINg5eH/Gj0Y230NAQfSjBe2nPQUGchJx4ntI9bh10Hs9aruKk825uO9oD7qbcbxWeZspvYdhEeVhufn9qRYpgbKD3UGUHlU+zRbUQJh3ttFGgNakaEddRWxG/UnSvCProKoROpeTuP8AxnDIZCQZoF7Ccc8yjf4i1STRdowNiGAsCvrVUPIPiHZY2TDs2WPHp2a3OgcbfPUfGrwia8xbQ1lnHxkz0cU7imb8LVUkGcPcGwtYVaoZly2UEKRqTSLBIGdbi4OgqwxRIqbX0sAam2yrba2RzPl5WYi3jQxa9763qSZxrzoZ5FCklgqrqS2gWuOAuMv/AE7AnQi1qpOPnVBmtdI+Q2Y9Kccb4p+IkEUJvGujPyqvcbASFEHx6tVIIjNm3k5iCSpIupYK4zaLf+WqHjkTI2Jj0LQydvGunyqLyYbz5S4vIpjUteyncf2ozyl7uLwrkAZ0WN2PrDl9CR8KstMg1cbIsDLnUGwzIBGTvm5j9RWuPcZgb96Nu0AHpNfcfL7ULg2yyuvJwUYHf+XsaJxlzGHsCCuRj7IP6XosVBWHfuoCxKnzZP8AqAjT9a1eJ0yyX74Uhjt2mWw/tUWDLmKMa3U9mV3K9Kfw4USRIWIF1ZMltEAH3J1oJjs24NIRrf0bSIB0vqPhrVyjOg7vutrmrnfB5rQPsXByqTp76vfCJe0wkDm5JXKfy2rkCXAcB+1ZXoOgrKIhyRZNtffU6SDTrSZcRtrep459tb9AKcztD2GQaa1JjcWI4JGvZiMoI11pRFidtag4hiM2XMSUj9UNrIaWTKQjsXSObGRtGfSNTugpe7Xvre5uLVJO5Zmubk6ADZfChyb7chyrooMpWYPkNhXjcuttQfUrY923Nz8krxcovza1MIYGysGBKsDdWU2IPWugcF8oTNDG065ZSpDyKMyzW5+BrnhN+drnS9WPgR/plFrEEjX30mSKaLYZNSpHQuH4+NWuWvGdVaxpu/FgyqqI78r5SBVOwT9xddtCPZp3gn0AI916ys2p6D3llYE9xByGbMaQcVkkNw0jso2B9FaeuwyXt4VXeKNcnQm+hPtUVEDYHhEBbUc6Xcd/zFF7+FNcGLHa9tyFvSrjLBZ1LDUHX8tPFE5vQs4DLkxhPR+6Da1+VOvLLKY43UHKfOxn38vgcwqs4BysjPY2Jvb2tasOPft8CRqTGM19wovrVXpoitxaEcTnuupyuPOI7eivS/hyNWFB28LFY7OFu0Tf9luY92xqs4WT0bC2VygXce73WvVm4VKq3NjePuyLmuHUdfh9qLBFkfBE8+Us5hy9oAW1S1W5ERIL5SGJsBmvlpBDh1ixMhAHZyNnjPLXX5c6O4ljcmHKqbySLZAd2v8ApSoo+BJhNM9rlWR2JHv3+dXnyYfNw+FiCCWYAeN6oWEIUYh7WSGMRx32lPL4k6/CrxwR+wwODjJs6xZmJ3UnWj2K+B/05gVlBpi1KjXcXN68oinIxhDrprzojCcNmmkCRRPK/NY0Jy/2q44bgOFjAbFOZJNzho3yonvbn8KlxuOWOMRwJFAjbRxrkX3nrSyyrrY0fp29ydFVxnDXwiZpDGXuFaNH7Qxk8idr86rmOm3N7FzZR7C1ZuNPeAEkkhxa/rG9U7Gtdwupyrb/AHUYPy5FyRUdIHZr/Gti2Ub3Y7c8tbRxFrnaNdydda1KDqTfS+tUIEZO/W/xrNT7qZYXCxZM7AlhooDUNOVDmwVVB2FGzqBwp18N6fcENlHQ6UpjjzxSEHVTt7VOMCmUDYMjFSfZtSTeimNbsseCky77A6/lp9Ay6EG461XYTqOhGnKnODBsBfTcflqDRtT0NWcBNxfpVfx5LSHS4vrTdz3T0ItelUgzOTyG5rkBmYVSqHTXkNe9VX8pZbS2vcjukj1atDyCOMkm1hmNUPisxeVmJOpzU8VsjkdIzBOMgUi4vqdcyHwpskhGBmbNlKC4OndpJhwQsh272ReebrR0r/0LLfV3G++9M1sSL9IEVjzlo8wDKHCNr2LjcX5j0qa8NxkiSJc6E5VkVr5dPRPUEajnSrDx5itzfLcg/Gj8LhyskZK3RpQjr6ra6MPjTN2LFbLfkyR5CrqyAHKwsV0vbw0tQckPb37wVwuUgbWNaxySiPDOXPaP3JH1IlJOhokQLMq5SkWMTvgZgFxApo4m+DpZYrb0jMNgARHmU5I2zpEG7qn2m6tT1C+tzc+OhoDAYgMSkiPHKmjK1waaoq23FtgCwFIMzQu3y1FZUxQa8rjSsoi0LcfMdQDYUlkmNzc3IGl9aP4g2+vPek0z2za6nQ23rNFaNsnsH4rJnjC3CroQz6BfGq3K8SscoMhOgaRtaY41szNmJ7NTkW/rUskC9CSNr3q8VRkyStkgDOiMhcC9mRbkrUsOGffua8pF7M17gIiznLe27jlWY4jZWksvJ20WmJkrzxxxlB2anYqyXzfGlLMpbYC+vd2rJS9+8XIAuDmuK8VG6WPO/q06QjZPhGs5QiwkYIR8asEaAI7bAyG3TekWCVJJcKhuHM4W4/7gJq3YvDr2ZC8mJHe1apzey+JG+DGeIncxmxNMcNKVAudqC8nluuJBBuNQPZoh7A28dDUmjQnoPebMNCTfQAVEdATbShsI5Z3W/ejaxUNyojEK1jpYeqOVcjmxRxWUtcahRrbNVUxIvINLgNcAj0qfcTmUFhmHj3hSXP3j3QTy6IaotEJbNSlsq21GrW8azEOWjCKdY2uLtfNUcsgyMVJaz5Xfa1axd5gLEkrlt7VGuxb6QTgY27SPLYDNdSdRTvCKS+KhIv2cqzQkbrqLj9vChcBFcKLgMpzX2zdKavEUnAUEOSJAR6TACuCkRcRxQIKxns0iJIky6Zr6qPAdevxr3BzB447EqyjuENYpbageLHZMoCKvdA2cGvOHvYa6BRYA+tW3Fp2Yc78lX6LLhscjsglFpFGRZgPSvyNNFdlspsDyI1VxSbg3CMZj5SuGAOXWWSTuxQjx6+6rHH5Pccw/dOBjxsK+g2GnGaP4Na48KGbwl3TBg+5HptA5lf49BrXlHxYdH7QZJIpoWCT4eVDHLhidrg9eR2NZWXg2c7K7xA7/AK0kmI7zE2VRqTTzHpe+3iKS4lbK43BWx6VmibZCLFy7hUY6+m6laBB17wFidanxMLMxLFmYd0m5K0N2ciH0Ml9iFufnWhUYpXY1wyhISQUVm0BLEhqWYiRg7d8SDY5gMrUxiN4muEJK6yZdEpRMyZjlLvY75Qoam5FfBiyRltcOhYG5IkYBq9ke5tYBRuF0zVEosDyJreM6je4NwR6n70wgXw2J/wAXGbEskiiw07xOgpjg+NyKcuIjMqg5Wkjssi/oaBwchSXCAAgpiUlm1/NoPvWmLTs5MUvrJM8Kj2jmIoeKb2N5OKVMtuE4xw5C5XEqokW5EkbKayXjGCJ/6mM30upJFU/QAr7K5ifcK9iHcXwAJ6UPsr9jf6ZJcFjfj2GS+SCSVwe7MLRhfd1FCScZeXNm7cENYKJLlqUJ6K+K3v7NMsNhxh8N+PksWlcxcLgZR/UOo7zn8qae9rDk1F44pCLNKTIcbMsblchMoXzwLXELez4nr8qWPO552AOoAstY531JJ1JLXLVEo0GvPn61d4pHeTkS4bXOvJtbGpB3HDG1rWPeuQOtQwrqTqCgzW2LeFTKc7DW7Fb3y+lSvkdPQ+wHpxsNQTtzYfzWmmKJjmLKbmNc0ZLW7vP9aQ8Ifs8QIZCezl1RjcFL1Y+LvkS7G0saiVFC302Pv91J+RZbjYr4zDkjVtDHJIY4z6JQHa/TnUPBMHJisRHFcpBGbzSZfRHP48q1xc5mw8cVwQ0ndIa+W2xqz+TeC7CIAjzjd6Rty9qq8jjHXJFYVOdvg6JwF8PBEkUMYiiQaKN28T1NWzDFWUEWPWqBgHyWsdd9KtvDMVoNd971CM/Vs15sfpuJPxHhcU5zhVXFIhSOUDUj2T1F/lWUyU3FZWjRitnBsZLv1/8AzSrESgLdjsbXrKyscTfISYhiZNbLc2Xq1bO0ax3Jux7pC373wrKyrIzSI5MLM6hpM8KNqEPddx1IpfKiBmyrZV0BJuaysp0SkDFt9TroKJjTImYi7GwRTqHNZWVREpdG5usbG939Mt1O9EcaGXiGJBAsshlI9osM361lZRfKOjtMCLeadjvIcq39XrU4HdGtiF16VlZRQsuArhuFEwZndocJhou2xcyi5hXYAdWY2AHXXkah4hi5J54yw7ONIhh8Nh1YlMIg2UfUnqSTzrKylW2N0LpDqda9QeNiTWVlKxohTIygakgtlJ0JWtSMrqbAlTlBHq1lZSlCxQwLNAWtlKAvHIHOaNx0o3jOID4HhuIuCyg4TEhdM4I0P86V7WUi5Lfj/BPwWPtpkNj5jTRe7If0q+4JMqjl3dvZrKyhk5Gw8DbDyba2A0Ip5wzEm4GpA2Ne1lQZq6LRhZwVF+mlZWVlaYydHnZIryP/2Q==",
  },
];

const MainContainer = () => {
  //const dispatch = useDispatch();
  //const thisConversation = useSelector(conversation);
  //const thisMacthes = useSelector(matches);
  //const currentAuthUser = useSelector(authUser);
  const currentAuthUser = useState({});
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [, setLastDirection] = useState();
  const [currentDirection, setCurrentDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    setCurrentDirection(direction);
    updateCurrentIndex(index - 1);
    setTimeout(() => {
      setCurrentDirection("");
    }, 1000);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  //const match = useSelector(selectedMatch);
  //const message = useSelector(selectedMessage);
  const match = null;
  const message = null;

  useEffect(() => {
    //TODO: dispatch on select item
  }, [message, match, currentAuthUser]);

  if (!match && !message) {
    return (
      <Box className="main-box-root">
        <Box mb={2}>
          <Box className="card-container">
            {db.map((character, index) => (
              <TinderCard
                className="swipe"
                ref={childRefs[index]}
                key={character.name}
                onSwipe={(dir) => swiped(dir, character.name, index)}
                onCardLeftScreen={() => outOfFrame(character.name, index)}
              >
                <Box
                  className="card"
                  style={{ backgroundImage: "url(" + character.url + ")" }}
                >
                  <Box
                    variant="span"
                    sx={{
                      marginLeft: "25px",
                      color: "#fff",
                      bottom: "100px",
                      position: "absolute",
                      fontSize: "30px",
                    }}
                  >
                    {character.name} {character.age}
                  </Box>
                  {currentDirection === "left" && currentIndex === index - 1 ? (
                    <Box
                      variant="span"
                      sx={{
                        color: "red",
                        transform: "rotate(25deg)",
                        padding: "2px",
                        border: "5px solid #f60d0d",
                        marginLeft: "25px",
                        right: "20px",
                        top: "40px",
                        position: "absolute",
                        fontSize: "50px",
                      }}
                    >
                      NOPE
                    </Box>
                  ) : null}
                  {currentDirection === "right" &&
                  currentIndex === index - 1 ? (
                    <Box
                      variant="span"
                      sx={{
                        color: "lightgreen",
                        transform: "rotate(-25deg)",
                        padding: "2px",
                        border: "5px solid lightgreen",
                        marginLeft: "25px",
                        left: "20px",
                        top: "40px",
                        position: "absolute",
                        fontSize: "50px",
                      }}
                    >
                      LIKE
                    </Box>
                  ) : null}

                  <Box className="card-footer">
                    <Box className="card-footer-bottons">
                      <ReplayIcon
                        sx={{
                          cursor: "pointer",
                          padding: "10px",
                          border: "1px solid orange",
                          borderRadius: "40px",
                          position: "relative",
                          height: "42px",
                          width: "42px",
                          marginRight: "10px",
                          left: "10px",
                          top: "25px",
                          "& > *": {
                            color: "orange",
                            opacity: "1",
                          },
                        }}
                        onClick={() => goBack()}
                      />
                      <CloseIcon
                        sx={{
                          cursor: "pointer",
                          padding: "10px",
                          border: "1px solid #ff6036",
                          borderRadius: "50px",
                          position: "relative",
                          height: "50px",
                          width: "50px",
                          marginRight: "10px",
                          left: "10px",
                          top: "25px",
                          "& > *": {
                            color: "#ff6036",
                            opacity: "1",
                          },
                        }}
                        onClick={() => swipe("left")}
                      />
                      <StarIcon
                        sx={{
                          cursor: "pointer",
                          padding: "10px",
                          border: "1px solid lightblue",
                          borderRadius: "40px",
                          position: "relative",
                          height: "42px",
                          width: "42px",
                          marginRight: "10px",
                          left: "10px",
                          top: "25px",
                          "& > *": {
                            color: "lightblue",
                            opacity: "1",
                          },
                        }}
                        onClick={() => {}}
                      />
                      <FavoriteIcon
                        sx={{
                          cursor: "pointer",
                          padding: "20px",
                          border: "1px solid lightgreen",
                          borderRadius: "50px",
                          position: "relative",
                          height: "31px",
                          width: "31px",
                          marginRight: "10px",
                          left: "10px",
                          top: "25px",
                          "& > *": {
                            color: "lightgreen",
                            opacity: "1",
                          },
                        }}
                        onClick={() => {
                          swipe("right");
                        }}
                      />
                      <BoltIcon
                        sx={{
                          cursor: "pointer",
                          padding: "15px",
                          border: "1px solid #a64aa6",
                          borderRadius: "30px",
                          position: "relative",
                          height: "32px",
                          width: "32px",
                          marginRight: "10px",
                          left: "10px",
                          top: "25px",
                          "& > *": {
                            color: "#a64aa6",
                            opacity: "1",
                          },
                        }}
                        onClick={() => {}}
                      />
                    </Box>
                  </Box>
                </Box>
              </TinderCard>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }
  return <Box className="in-build-app-main-content">{/* TODO */}</Box>;
};

export default MainContainer;
