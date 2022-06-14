import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { exerciseOptions, fetchData, youtubeOptions } from "../utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";

const ExerciseDetail = () => {
    const [exerciseDetail, setExerciseDetail] = useState({});
    const [exerciseVideos, setExerciseVideos] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchExercisesData = async () => {
            const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
            const youtubeSearchUrl =
                "https://youtube-search-and-download.p.rapidapi.com/video/related";

            const exerciseDetailData = await fetchData(
                `${exerciseDbUrl}/exercises/exercise/${id}`,
                exerciseOptions
            );
            setExerciseDetail(exerciseDetailData);

            const exerciseVideosData = await fetchData(
                `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
                youtubeOptions
            );
            console.log(exerciseVideosData.contents);
            setExerciseVideos(exerciseVideosData.contents);
        };
        fetchExercisesData();
    }, [id]);
    return (
        <Box sx={{ mt: { lg: "96px", xs: "60px" } }}>
            <Detail exerciseDetail={exerciseDetail} />
            <ExerciseVideos
                exerciseVideos={exerciseVideos}
                name={exerciseDetail.name}
            />
            <SimilarExercises />
        </Box>
    );
};

export default ExerciseDetail;
